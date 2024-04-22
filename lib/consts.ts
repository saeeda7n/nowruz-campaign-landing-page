import { addDays, differenceInSeconds, subDays, format } from "date-fns";

export const START = format(subDays(Date.now(), 5), "yyyy/MM/d");
export const END = format(addDays(Date.now(), 7), "yyyy/MM/d");

export const startIn = () => Date.now() > new Date(START).getTime();
export const endIn = () => differenceInSeconds(addDays(END, 1), Date.now());

export const POINTS = [
  200, 300, 400, 40, 100, 10, 50, 30, 54, 44, 77, 344, 75, 34, 99, 33, 22, 98,
  37, 27,
];
