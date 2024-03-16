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
import { getMessagesChart } from "@/server/actions/dashboard/messages";
import { useChart } from "@/lib/useChart";

const Chart = ({ data }: Awaited<ReturnType<typeof getMessagesChart>>) => {
  const result = useChart(data);

  return (
    <div className="space-y-2">
      <ResponsiveContainer width={"100%"} height={400}>
        <LineChart data={result}>
          <Line
            type="monotone"
            dataKey="count"
            strokeWidth={2}
            name="پیامک"
            stroke="#8884d8"
          />
          <XAxis dataKey="label" />
          <Tooltip />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
      <div className="text-sm font-medium">
        پیامک های ارسال شده: {data.length} عدد{" "}
      </div>
    </div>
  );
};

export default Chart;
