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
import { getUsersChart } from "@/server/actions/dashboard/users";
import { useChart } from "@/lib/useChart";

const Chart = ({ data }: Awaited<ReturnType<typeof getUsersChart>>) => {
  const result = useChart(data);
  return (
    <div className="space-y-2">
      <ResponsiveContainer width={"100%"} height={400}>
        <LineChart data={result}>
          <Line
            type="monotone"
            dataKey="count"
            name="عضو جدید"
            stroke="#8884d8"
            strokeWidth={2}
          />
          <XAxis dataKey="label" />
          <Tooltip />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
      <div className="text-sm font-medium">
        کاربران عضو شده تاکنون: {data.length} عدد{" "}
      </div>
    </div>
  );
};

export default Chart;
