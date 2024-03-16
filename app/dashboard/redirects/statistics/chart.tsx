"use client";
import React from "react";
import { format, differenceInDays, addDays } from "date-fns";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { START } from "@/lib/consts";
import { getAnswersChart } from "@/server/actions/dashboard/answers";

const Chart = ({ data }: Awaited<ReturnType<typeof getAnswersChart>>) => {
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
            name="پاسخ کاربران"
            stroke="#8884d8"
          />
          <XAxis dataKey="label" />
          <Tooltip />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
      <div className="text-sm font-medium">
        پاسخ های ثبت شده تاکنون: {data.length} عدد{" "}
      </div>
    </div>
  );
};

export default Chart;
