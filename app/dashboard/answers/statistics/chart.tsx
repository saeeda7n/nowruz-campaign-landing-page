"use client";
import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getAnswersChart } from "@/server/actions/dashboard/answers";
import { useChart } from "@/lib/useChart";

const Chart = ({ data }: Awaited<ReturnType<typeof getAnswersChart>>) => {
  const result = useChart(data);

  return (
    <div className="space-y-2">
      <ResponsiveContainer width={"100%"} height={400}>
        <LineChart data={result}>
          <Line
            type="monotone"
            dataKey="count"
            name="پاسخ کاربران"
            strokeWidth={2}
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
