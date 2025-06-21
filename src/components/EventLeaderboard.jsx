import { useState, useEffect } from "react";
import clsx from "clsx";
import EventTable from "./EventTable.jsx";
import HeatTable from "./HeatTable.jsx";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { EVENT_OPTIONS } from "../lib/constants";

export default function EventLeaderboard() {
  const [event, setEvent] = useState(2);
  const [gender, setGender] = useState("women");
  const [view, setView] = useState("table");
  const [data, setData] = useState(null);

  const adjustEventForGender = (eventNum, gender) => {
    const isWomensEvent = eventNum <= 17;
    if (gender === "women" && !isWomensEvent) {
      return eventNum - 16;
    } else if (gender === "men" && isWomensEvent) {
      return eventNum + 16;
    }
    return eventNum;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://opensheet.elk.sh/1Hww9j0A8B4cc24gzqDgK5alCsr5kG3nE1uYjSc9HiN0/${event}`,
      );
      const data = await response.json();
      // console.log(data);
      setData(data);
    };
    fetchData();
  }, [event]);

  const selectedEventObject = EVENT_OPTIONS.flatMap(
    (group) => group.items,
  ).find((item) => item.value === event % 19);

  return (
    <div className="flex h-full flex-col rounded-xl bg-[var(--color-muted)]/60 p-4 md:col-span-2">
      <div className="mb-4">
        <Listbox
          value={event % 16}
          onChange={(newEvent) =>
            setEvent(adjustEventForGender(newEvent, gender))
          }
        >
          {({ open }) => (
            <div className="relative">
              <ListboxButton
                className={clsx(
                  "relative block w-full rounded-lg bg-[var(--color-muted)]/60 py-1.5 pr-8 pl-3 text-left text-sm/6 text-black",
                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25",
                )}
              >
                {selectedEventObject
                  ? selectedEventObject.label
                  : "Select an event"}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </ListboxButton>
              <ListboxOptions
                anchor="bottom"
                transition
                className={clsx(
                  "w-(--button-width) h-1/4 rounded-xl border border-white/5 bg-white p-1 [--anchor-gap:--spacing(1)] focus:outline-none",
                  "transition duration-100 ease-in data-leave:data-closed:opacity-0",
                )}
              >
                {EVENT_OPTIONS.map((eventGroup) => (
                  <div key={eventGroup.label} className="group">
                    {/* Optgroup-like Header */}
                    <div className="sticky top-0 z-20 px-4 py-2 bg-white border-dashed border-b-2 text-sm/6 text-gray-500">
                      {eventGroup.label}
                    </div>
                    {eventGroup.items.map((item) => (
                      <ListboxOption
                        key={item.value}
                        value={item.value}
                        className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
                      >
                        <div className="text-sm/6 text-black">{item.label}</div>
                      </ListboxOption>
                    ))}
                  </div>
                ))}
              </ListboxOptions>
            </div>
          )}
        </Listbox>
      </div>
      <div className="relative">
        <div className="inline-flex justify-start bg-[var(--color-muted)]/60 rounded-lg p-1">
          <input
            type="radio"
            id="men"
            name="tabs"
            value="men"
            className="hidden peer/men"
            checked={gender === "men"}
            onChange={(e) => {
              const newGender = e.target.value;
              setGender(newGender);
              setEvent(adjustEventForGender(event, newGender));
            }}
          />
          <label
            htmlFor="men"
            className="text-xs md:text-xs px-3 py-1.5 cursor-pointer rounded-md peer-checked/men:bg-white peer-checked/men:text-black transition-all"
          >
            Men
          </label>

          <input
            type="radio"
            id="women"
            name="tabs"
            value="women"
            className="hidden peer/women"
            checked={gender === "women"}
            onChange={(e) => {
              const newGender = e.target.value;
              setGender(newGender);
              setEvent(adjustEventForGender(event, newGender));
            }}
          />
          <label
            htmlFor="women"
            className="text-xs md:text-md px-3 py-1.5 cursor-pointer rounded-md peer-checked/women:bg-white peer-checked/women:text-black transition-all"
          >
            Women
          </label>
        </div>

        <div className="absolute top-0 right-0 inline-flex justify-start bg-[var(--color-muted)]/60 rounded-lg p-1">
          <input
            type="radio"
            id="tableView"
            name="views"
            value="table"
            className="hidden peer/tableView"
            checked={view === "table"}
            onChange={(e) => setView(e.target.value)}
          />
          <label
            htmlFor="tableView"
            className="text-xs md:text-md px-3 py-1.5 cursor-pointer rounded-md peer-checked/tableView:bg-white peer-checked/tableView:text-black transition-all"
          >
            Times
          </label>

          <input
            type="radio"
            id="heatView"
            name="views"
            value="heats"
            className="hidden peer/heatView"
            checked={view === "heats"}
            onChange={(e) => setView(e.target.value)}
          />
          <label
            htmlFor="heatView"
            className="text-xs md:text-md px-3 py-1.5 cursor-pointer rounded-md peer-checked/heatView:bg-white peer-checked/heatView:text-black transition-all"
          >
            Heats
          </label>
        </div>

        <div className="mt-4">
          {data && view === "table" && (
            <EventTable data={data} eventNum={event} />
          )}
          {data && view === "heats" && (
            <HeatTable results={data} eventNum={event} />
          )}
        </div>
      </div>
    </div>
  );
}
