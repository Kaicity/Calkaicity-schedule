export enum Day {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export const DayTranslations: Record<Day, string> = {
  [Day.Monday]: 'Thứ Hai',
  [Day.Tuesday]: 'Thứ Ba',
  [Day.Wednesday]: 'Thứ Tư',
  [Day.Thursday]: 'Thứ Năm',
  [Day.Friday]: 'Thứ Sáu',
  [Day.Saturday]: 'Thứ Bảy',
  [Day.Sunday]: 'Chủ Nhật',
};

export const displayFormatDays = (day: Day): string => {
  return DayTranslations[day] || day;
};
