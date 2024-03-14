import React from "react";
import { TicketPercent } from "lucide-react";
import { getDiscounts } from "@/server/actions/dashboard/discounts";
import DataTable from "@/app/dashboard/discounts/components/dataTable";

const Page = async () => {
  const data = await getDiscounts();
  return (
    <div>
      <div className="flex flex-col gap-y-5 rounded-2xl border bg-white px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <TicketPercent size="18" />
            کدهای تخفیف
          </div>
        </div>
        <DataTable {...data} />
      </div>
    </div>
  );
};

export default Page;
