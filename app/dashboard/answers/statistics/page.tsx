import React from "react";
import { MessageCircleQuestion } from "lucide-react";
import { getAnswersChart } from "@/server/actions/dashboard/answers";
import Chart from "@/app/dashboard/answers/statistics/chart";

const Page = async () => {
  const data = await getAnswersChart();
  return (
    <div className="flex flex-col gap-y-5 rounded-2xl border bg-white px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <MessageCircleQuestion size="18" />
          نمودار شرکت کاربران در سوالات
        </div>
      </div>
      <Chart {...data} />
    </div>
  );
};

export default Page;
