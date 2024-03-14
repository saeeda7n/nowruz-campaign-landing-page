import React from "react";
import { Users } from "lucide-react";
import { getMessages } from "@/server/actions/dashboard/messages";
import DataTable from "@/app/dashboard/messages/components/dataTable";

const Page = async () => {
  const data = await getMessages();

  return (
    <div>
      <div className="flex flex-col gap-y-5 rounded-2xl border bg-white px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Users size="18" />
            پیامک های ارسال شده
          </div>
        </div>
        <DataTable {...data} />
      </div>
    </div>
  );
};

export default Page;
