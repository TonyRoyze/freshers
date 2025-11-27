// import { FACULTY_OPTIONS } from "../lib/constants";
const relay = [16, 17, 32, 33];

export default function EventTable({ data, eventNum }) {
  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-xs">
        <thead className="[&_tr]:border-b">
          <tr className="border-[var(--color-border)] transition-colors hover:bg-[var(--color-background)]/50 data-[state=selected]:bg-[var(--color-background)]">
            <th
              scope="col"
              className="px-2 text-xs md:text-sm md:px-3 h-12 text-left align-middle font-medium text-[var(--color-muted-foreground)]"
            >
              Rank
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
            <th
              scope="col"
              className="px-2 text-xs md:text-sm md:px-3 h-12 text-left align-middle font-medium text-[var(--color-muted-foreground)]"
            >
              Timing
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {data.map(
            (event, index) =>
              event.Faculty && (
                <tr
                  key={index}
                  className="border-[var(--color-border)] transition-colors hover:bg-[var(--color-background)]/50"
                >
                  <td className="px-3 text-xs justify-center md:text-sm py-4 align-middle">
                    {event.Position}
                  </td>
                  <td className="px-2 md:px-3 py-4 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 md:text-sm border-transparent bg-[var(--color-secondary)] text-secondary-foreground hover:bg-[var(--color-secondary)]/80">
                      {event.Faculty}
                    </span>
                  </td>
                  {!relay.includes(eventNum) && (
                    <td className="hidden md:table-cell px-2 text-xs justify-center md:text-sm py-4 align-middle">
                      {event.Name}
                    </td>
                  )}
                  {!relay.includes(eventNum) && (
                    <td className="md:hidden px-2 text-xs justify-center md:text-sm py-4 align-middle">
                      {event.Name.split(" ")[0]}
                    </td>
                  )}
                  <td className="px-2 text-xs justify-center md:text-sm py-4 align-middle">
                    {event.Timing}
                  </td>
                </tr>
              ),
          )}
        </tbody>
      </table>
    </div>
  );
}
