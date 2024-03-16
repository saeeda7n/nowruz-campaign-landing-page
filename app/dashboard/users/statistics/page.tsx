import React from "react";
import { Users } from "lucide-react";
import { getUsersChart } from "@/server/actions/dashboard/users";
import Chart from "@/app/dashboard/users/statistics/chart";

const Page = async () => {
  const data = await getUsersChart();
  return (
    <div className="flex flex-col gap-y-5 rounded-2xl border bg-white px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Users size="18" />
          نمودار عضویت روزانه کاربران
        </div>
      </div>
      <Chart {...data} />
    </div>
  );
};

export default Page;
