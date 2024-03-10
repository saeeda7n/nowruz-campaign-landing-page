import { addDays, differenceInSeconds } from "date-fns";

export const START = "2024/3/9";
export const END = "2024/3/11";

export const startIn = () => Date.now() > new Date(START).getTime();
export const endIn = () => differenceInSeconds(addDays(END, 1), Date.now());

export const POINTS = [200, 300, 400, 40, 100, 10, 50, 30];
