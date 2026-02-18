import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

type HolidayPeriod = {
  name: SchoolHolidayName;
  start: string;
  end: string;
};

export type SchoolHolidayName =
  | "toussaint"
  | "noel"
  | "hiver"
  | "printemps"
  | "ascension"
  | "ete";

export type SchoolHolidayInfo = {
  isHoliday: boolean;
  holidayName: SchoolHolidayName | null;
};

/**
 * Zone C (Paris, Créteil, Versailles, Montpellier, Toulouse)
 * school holiday periods.
 *
 * Dates: start = first day of vacation, end = last day of vacation
 * (the day before classes resume).
 */
const holidays: HolidayPeriod[] = [
  // 2025-2026
  { name: "toussaint", start: "2025-10-18", end: "2025-11-02" },
  { name: "noel", start: "2025-12-20", end: "2026-01-04" },
  { name: "hiver", start: "2026-02-21", end: "2026-03-08" },
  { name: "printemps", start: "2026-04-18", end: "2026-05-03" },
  { name: "ascension", start: "2026-05-13", end: "2026-05-17" },
  { name: "ete", start: "2026-07-04", end: "2026-08-31" },

  // 2026-2027
  { name: "toussaint", start: "2026-10-17", end: "2026-11-01" },
  { name: "noel", start: "2026-12-19", end: "2027-01-03" },
  { name: "hiver", start: "2027-02-06", end: "2027-02-21" },
  { name: "printemps", start: "2027-04-03", end: "2027-04-18" },
  { name: "ascension", start: "2027-05-05", end: "2027-05-09" },
  { name: "ete", start: "2027-07-03", end: "2027-08-31" },
];

export const getSchoolHolidayInfo = (date: string): SchoolHolidayInfo => {
  const d = dayjs(date);

  const match = holidays.find((h) =>
    d.isBetween(h.start, h.end, "day", "[]")
  );

  return {
    isHoliday: !!match,
    holidayName: match?.name ?? null,
  };
};
