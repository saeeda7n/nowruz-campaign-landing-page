import React from "react";
import { MessageCircleQuestion } from "lucide-react";
import { getAnswers } from "@/server/actions/dashboard/answers";
import DataTable from "@/app/dashboard/answers/components/dataTable";

const Page = async () => {
  const data = await getAnswers();
  return (
    <div>
      <div className="flex flex-col gap-y-5 rounded-2xl border bg-white px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <MessageCircleQuestion size="18" />
            پاسخ های ثبت شده
          </div>
        </div>
        <DataTable {...data} />
      </div>
    </div>
  );
};

export default Page;
