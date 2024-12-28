export enum Day {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export const DayTranslations: Record<Day, string> = {
  [Day.MONDAY]: 'Thứ Hai',
  [Day.TUESDAY]: 'Thứ Ba',
  [Day.WEDNESDAY]: 'Thứ Tư',
  [Day.THURSDAY]: 'Thứ Năm',
  [Day.FRIDAY]: 'Thứ Sáu',
  [Day.SATURDAY]: 'Thứ Bảy',
  [Day.SUNDAY]: 'Chủ Nhật',
};

export const displayFormatDays = (day: Day): string => {
  return DayTranslations[day] || day;
};
