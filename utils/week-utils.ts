import dayjs from "dayjs";

import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

export type WeekType = "EVEN" | "ODD";

export const getWeekType = (date: string) => {
  const selectedDate = dayjs(date);
  const weekNumber = selectedDate.week();
  const weekType: WeekType = weekNumber % 2 === 0 ? "EVEN" : "ODD";

  return weekType;
};
