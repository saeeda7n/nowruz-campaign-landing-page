import React from "react";
import { LinkIcon } from "lucide-react";
import Chart from "@/app/dashboard/answers/statistics/chart";
import { getRedirectsChart } from "@/server/actions/dashboard/redirects";

const Page = async () => {
  const data = await getRedirectsChart();
  return (
    <div className="flex flex-col gap-y-5 rounded-2xl border bg-white px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <LinkIcon size="18" />
          نمودار ارجاعات به فروشگاه
        </div>
      </div>
      <Chart {...data} />
    </div>
  );
};

export default Page;
