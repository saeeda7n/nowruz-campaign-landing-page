import React from "react";
import { Mails } from "lucide-react";
import Chart from "@/app/dashboard/messages/statistics/chart";
import { getMessagesChart } from "@/server/actions/dashboard/messages";

const Page = async () => {
  const data = await getMessagesChart();
  return (
    <div className="flex flex-col gap-y-5 rounded-2xl border bg-white px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Mails size="18" />
          نمودار وضعیت ارسال پیامک روزانه
        </div>
      </div>
      <Chart {...data} />
    </div>
  );
};

export default Page;
