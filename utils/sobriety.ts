import dayjs from "dayjs";

export type SobrietyMilestone = {
  days: number;
  labelKey: string;
  badgeNumber: string;
};

/**
 * Milestones matching the "Toutes les étapes" screen from Moveo:
 * 1, 2, 3, 4, 5, 6, 7 (1 semaine), 10 (double chiffres), 12,
 * 14 (2 semaines), 17, 21 (3 semaines), 25, 31 (1 mois), 35 (5 semaines),
 * 42 (6 semaines), 50, 60 (2 mois), 75, 90 (3 mois), ...
 */
export const SOBRIETY_MILESTONES: SobrietyMilestone[] = [
  { days: 1, labelKey: "1-day", badgeNumber: "1" },
  { days: 2, labelKey: "2-days", badgeNumber: "2" },
  { days: 3, labelKey: "3-days", badgeNumber: "3" },
  { days: 4, labelKey: "4-days", badgeNumber: "4" },
  { days: 5, labelKey: "5-days", badgeNumber: "5" },
  { days: 6, labelKey: "6-days", badgeNumber: "6" },
  { days: 7, labelKey: "1-week", badgeNumber: "7" },
  { days: 10, labelKey: "double-digits", badgeNumber: "10" },
  { days: 12, labelKey: "12-days", badgeNumber: "12" },
  { days: 14, labelKey: "2-weeks", badgeNumber: "2" },
  { days: 17, labelKey: "17-days", badgeNumber: "17" },
  { days: 21, labelKey: "3-weeks", badgeNumber: "3" },
  { days: 25, labelKey: "25-days", badgeNumber: "25" },
  { days: 31, labelKey: "1-month", badgeNumber: "1" },
  { days: 35, labelKey: "5-weeks", badgeNumber: "5" },
  { days: 42, labelKey: "6-weeks", badgeNumber: "6" },
  { days: 50, labelKey: "50-days", badgeNumber: "50" },
  { days: 60, labelKey: "2-months", badgeNumber: "2" },
  { days: 75, labelKey: "75-days", badgeNumber: "75" },
  { days: 90, labelKey: "3-months", badgeNumber: "3" },
  { days: 120, labelKey: "4-months", badgeNumber: "4" },
  { days: 150, labelKey: "5-months", badgeNumber: "5" },
  { days: 180, labelKey: "6-months", badgeNumber: "6" },
  { days: 270, labelKey: "9-months", badgeNumber: "9" },
  { days: 365, labelKey: "1-year", badgeNumber: "1" },
];

// Sobriety start date: March 1, 2026
const SOBRIETY_START = "2026-03-01";

export const getSobrietyDays = (today?: string): number => {
  const now = today ? dayjs(today) : dayjs();
  return now.diff(dayjs(SOBRIETY_START), "day");
};

export const getLastReachedMilestone = (
  currentDays: number
): SobrietyMilestone | undefined => {
  const reached = SOBRIETY_MILESTONES.filter((m) => m.days <= currentDays);
  return reached[reached.length - 1];
};

export const getNextMilestone = (
  currentDays: number
): SobrietyMilestone | undefined => {
  return SOBRIETY_MILESTONES.find((m) => m.days > currentDays);
};

/**
 * Get ring progress as a fraction [0, 1] between the last reached milestone
 * and the next milestone.
 */
export const getRingProgress = (currentDays: number): number => {
  const lastMilestone = getLastReachedMilestone(currentDays);
  const nextMilestone = getNextMilestone(currentDays);

  if (!nextMilestone) return 1; // All milestones reached
  if (!lastMilestone) return currentDays / nextMilestone.days;

  const range = nextMilestone.days - lastMilestone.days;
  const progress = currentDays - lastMilestone.days;
  return progress / range;
};

export const getMilestoneDate = (
  milestone: SobrietyMilestone,
  startDate?: string
): string => {
  const start = startDate ?? SOBRIETY_START;
  return dayjs(start).add(milestone.days, "day").format("DD/MM/YYYY");
};

export const getMilestoneDateObject = (
  milestone: SobrietyMilestone,
  startDate?: string
): dayjs.Dayjs => {
  const start = startDate ?? SOBRIETY_START;
  return dayjs(start).add(milestone.days, "day");
};
