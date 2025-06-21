// import { FACULTY_OPTIONS } from "../lib/constants";
const relay = [16, 17, 32, 33];

const HeatTable = ({ results, eventNum = 1 }) => {
  const validSwimmers = results.filter((s) => s.Heat !== "" && s.Lane !== "");

  const sortedSwimmers = [...validSwimmers].sort((a, b) => {
    const heatA = parseInt(a.Heat, 10);
    const heatB = parseInt(b.Heat, 10);
    const laneA = parseInt(a.Lane, 10);
    const laneB = parseInt(b.Lane, 10);

    if (heatA !== heatB) {
      return heatA - heatB;
    }
    return laneA - laneB;
  });

  // Group swimmers by heat
  const heatsMap = new Map();
  sortedSwimmers.forEach((swimmer) => {
    if (!heatsMap.has(swimmer.Heat)) {
      heatsMap.set(swimmer.Heat, {
        heatNumber: swimmer.Heat,
        swimmers: [],
      });
    }
    heatsMap.get(swimmer.Heat).swimmers.push({
      lane: swimmer.Lane,
      faculty: swimmer.Faculty,
      name: swimmer.Name,
      timing: swimmer.Timing,
      points: swimmer.Points,
    });
  });

  // console.log(eventNum, relay, relay.includes(eventNum));

  const heats = Array.from(heatsMap.values()).sort(
    (a, b) => parseInt(a.heatNumber, 10) - parseInt(b.heatNumber, 10),
  );

  return (
    <div className="space-y-8 p-4">
      {heats.map((heat) => (
        <div key={heat.heatNumber}>
          <h3 className="px-2 mt-4 text-lg md:text-xl md:px-4 font-bold text-[var(--color-primary)]">
            Heat {heat.heatNumber} of {heats.length}
          </h3>
          <table className="w-full caption-bottom text-sm border-collapse">
            <thead className="[&_tr]:border-b border-[var(--color-border)]">
              <tr className="transition-colors hover:bg-[var(--color-background)]/50">
                <th
                  scope="col"
                  className="px-2 text-xs md:text-sm md:px-3 h-12 text-left align-middle font-medium text-[var(--color-muted-foreground)]"
                >
                  Lane
                </th>
                <th
                  scope="col"
                  className="px-2 text-xs md:text-sm md:px-3 h-12 text-left align-middle font-medium text-[var(--color-muted-foreground)]"
                >
                  Faculty
                </th>
                {!relay.includes(eventNum) && (
                  <th
                    scope="col"
                    className="px-2 text-xs md:text-sm md:px-3 h-12 text-left align-middle font-medium text-[var(--color-muted-foreground)]"
                  >
                    Name
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {heat.swimmers.map((swimmer) => (
                <tr
                  key={`${swimmer.lane}-${swimmer.heatNumber}`} // Unique key for each row
                  className="border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-background)]/50"
                >
                  <td className="px-3 text-sm md:text-sm py-4 align-middle text-center">
                    {swimmer.lane}
                  </td>
                  <td className="px-2 md:px-3 py-4 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[var(--color-secondary)] text-secondary-foreground hover:bg-[var(--color-secondary)]/80">
                      {swimmer.faculty}
                    </span>
                  </td>
                  {!relay.includes(eventNum) && (
                    <td className="hidden md:table-cell px-2 text-xs justify-center md:text-sm py-4 align-middle">
                      {swimmer.name}
                    </td>
                  )}
                  {!relay.includes(eventNum) && (
                    <td className="md:hidden px-2 text-xs justify-center md:text-sm py-4 align-middle">
                      {swimmer.name.split(" ")[0]}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default HeatTable;
