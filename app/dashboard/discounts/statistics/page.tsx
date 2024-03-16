import React from "react";
import { TicketPercent } from "lucide-react";
import Chart from "@/app/dashboard/discounts/statistics/chart";
import { getDiscountsChart } from "@/server/actions/dashboard/discounts";

const Page = async () => {
  const data = await getDiscountsChart();
  return (
    <div className="flex flex-col gap-y-5 rounded-2xl border bg-white px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <TicketPercent size="18" />
          نمودار گردش گردانه و کد تخفیف ایجاد شده
        </div>
      </div>
      <Chart {...data} />
    </div>
  );
};

export default Page;
