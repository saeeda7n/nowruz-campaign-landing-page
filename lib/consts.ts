import { addDays, differenceInSeconds } from "date-fns";

export const START = "2024/3/7";
export const END = "2024/3/10";

export const startIn = () => Date.now() > new Date(START).getTime();
export const endIn = () => differenceInSeconds(addDays(END, 1), Date.now());
