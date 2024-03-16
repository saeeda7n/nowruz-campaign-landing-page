"use client";
import React from "react";
import { getDiscountsChart } from "@/server/actions/dashboard/discounts";
import { format, differenceInDays, addDays } from "date-fns";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { END, START } from "@/lib/consts";

export const options = {
  responsive: true,
};

const Chart = ({ data }: Awaited<ReturnType<typeof getDiscountsChart>>) => {
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

  return (
    <div className="space-y-2">
      <ResponsiveContainer width={"100%"} height={400}>
        <LineChart data={result}>
          <Line
            type="monotone"
            dataKey="count"
            name="کد تخفیف ایجاد شده"
            stroke="#8884d8"
          />
          <XAxis dataKey="label" string={"asd"} />
          <Tooltip />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
      <div className="text-sm font-medium">
        کد تخفیف ایجاد شده تاکنون: {data.length} عدد{" "}
      </div>
    </div>
  );
};

export default Chart;
