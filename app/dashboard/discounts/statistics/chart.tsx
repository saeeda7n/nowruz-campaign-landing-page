"use client";
import React from "react";
import { getDiscountsChart } from "@/server/actions/dashboard/discounts";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useChart } from "@/lib/useChart";

export const options = {
  responsive: true,
};

const Chart = ({ data }: Awaited<ReturnType<typeof getDiscountsChart>>) => {
  const result = useChart(data);

  return (
    <div className="space-y-2">
      <ResponsiveContainer width={"100%"} height={400}>
        <LineChart data={result}>
          <Line
            type="monotone"
            dataKey="count"
            name="کد تخفیف ایجاد شده"
            strokeWidth={2}
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
