import React from "react";
import { Link } from "lucide-react";
import DataTable from "@/app/dashboard/redirects/components/dataTable";
import { getRedirects } from "@/server/actions/dashboard/redirects";

const Page = async () => {
  const data = await getRedirects();

  return (
    <div>
      <div className="flex flex-col gap-y-5 rounded-2xl border bg-white px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Link size="18" />
            انتقال های ثبت شده
          </div>
        </div>
        <DataTable {...data} />
      </div>
    </div>
  );
};

export default Page;
