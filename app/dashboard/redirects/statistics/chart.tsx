"use client";
import React, { useMemo } from "react";
import { format, differenceInDays, addDays, startOfDay } from "date-fns";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { START } from "@/lib/consts";
import { getRedirectsChart } from "@/server/actions/dashboard/redirects";
import content from "@/data/landing/content.json";

const colors = [
  "#4a148c",
  "#f50057",
  "#673ab7",
  "#7cb342",
  "#2979ff",
  "#283593",
  "#1565c0",
  "#00e676",
  "#7c4dff",
  "#f50057",
  "#c62828",
];

function getProductName(_id: string) {
  return content.special_offers.find(({ id }) => id === _id)?.title || "نامشخص";
}

const Chart = ({ data }: Awaited<ReturnType<typeof getRedirectsChart>>) => {
  const { array, keys } = useMemo(() => {
    const duration = differenceInDays(Date.now(), START) + 1;
    const keys: any = {};
    let mappedData: any = {};
    const array: any[] = [];
    data.forEach(({ referenceId, createdAt }) => {
      keys[referenceId] = 0;
      const index = format(startOfDay(createdAt), "yyyy/MM/dd") as any;
      if (mappedData[index])
        if (mappedData[index][referenceId]) {
          mappedData[index][referenceId]++;
        } else {
          mappedData[index] = { ...mappedData[index], [referenceId]: 1 };
        }
      else {
        mappedData[index] = { [referenceId]: 1 };
      }
    });
    new Array(duration).fill(0).forEach((_, index) => {
      const label = format(addDays(START, index), "yyyy/MM/dd") as any;
      mappedData[label] = { ...keys, ...mappedData[label] };
      array.push({
        ...mappedData[label],
        label,
      });
    });
    return { array, keys };
  }, [data]);

  return (
    <div className="space-y-2">
      <ResponsiveContainer width={"100%"} height={400}>
        <LineChart data={array}>
          {Object.keys(keys).map((key, index) => (
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey={key}
              name={getProductName(key)}
              stroke={colors[index]}
            />
          ))}

          <XAxis dataKey="label" />
          <Tooltip />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
      <div className="text-sm font-medium">
        رکورد های ثبت شده تاکنون: {data.length} رکورد{" "}
      </div>
    </div>
  );
};
export default Chart;
