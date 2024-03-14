import React from "react";
import DataTable from "@/app/dashboard/users/components/dataTable";
import { getUsers } from "@/server/actions/dashboard/users";
import { Users } from "lucide-react";

const Page = async () => {
  const data = await getUsers();
  return (
    <div>
      <div className="flex flex-col gap-y-5 rounded-2xl border bg-white px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Users size="18" />
            لیست کاربران
          </div>
        </div>
        <DataTable {...data} />
      </div>
    </div>
  );
};

export default Page;
