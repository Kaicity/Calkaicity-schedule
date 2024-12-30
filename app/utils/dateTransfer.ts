import { parse } from 'date-fns';

export const transferDatefromStringToDate = (date: string): Date => {
  if (date) {
    const parseDate = parse(date, 'dd-MM-yyyy', new Date());
    return parseDate;
  }
  return new Date();
};
