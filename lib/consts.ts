import { addDays, differenceInSeconds } from "date-fns";

export const START = "2024/4/1";
export const END = "2024/4/14";

export const startIn = () => Date.now() > new Date(START).getTime();
export const endIn = () => differenceInSeconds(addDays(END, 1), Date.now());

export const POINTS = [200, 300, 400, 40, 100, 10, 50, 30,54,44,77,344,75,34,99,33,22,98,37,27];
