import { useMemo } from "react";
import { addDays, differenceInDays, format } from "date-fns";
import { START } from "@/lib/consts";

export function useChart(data: any[]) {
  return useMemo(() => {
    const duration = differenceInDays(Date.now(), START) + 1;
    let array: any[] = [];

    new Array(duration).fill(0).forEach((_, index) => {
      array[format(addDays(START, index), "yyyy/MM/dd") as any] = 0;
    });

    data
      .map((d) => format(d.createdAt, "yyyy/MM/dd"))
      .forEach((d: any) => ++array[d]);

    const result = [];
    for (const c in array) {
      result.push({
        label: c,
        count: array[c],
      });
    }
    return result;
  }, [data]);
}
