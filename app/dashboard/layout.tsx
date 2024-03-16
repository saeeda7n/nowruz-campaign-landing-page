import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { Loader, LogOutIcon } from "lucide-react";
import { getSession } from "@/server/actions/auth";
import { notFound, redirect } from "next/navigation";
import AdminMiniProfile from "@/app/dashboard/components/adminMiniProfile";

const items = [
  {
    name: "داشبورد",
    items: [{ name: "مرور اجمالی", url: "/dashboard" }],
  },
  {
    name: "مدیریت",
    items: [
      { name: "کاربران", url: "/dashboard/users" },
      { name: "پیامک های ارسال شده", url: "/dashboard/messages" },
      { name: "کد های تخفیف ایجاد شده", url: "/dashboard/discounts" },
      { name: "واجدین شرایط قرعه کشی", url: "/dashboard/users/statistics" },
      { name: "پاسخ های ثبت شده", url: "/dashboard/answers" },
      { name: "ارجاعات به فروشگاه", url: "/dashboard/redirects" },
    ],
  },
  {
    name: "گزارشات",
    items: [
      { name: "تعداد شرکت کنندگان", url: "/dashboard/users/statistics" },
      {
        name: "آمار شرکت در کتاب سوالات",
        url: "/dashboard/answers/statistics",
      },
      {
        name: "آمار شرکت در گردانه شانس",
        url: "/dashboard/discounts/statistics",
      },
      {
        name: "آمار پیامک های ارسال شده",
        url: "/dashboard/messages/statistics",
      },
      {
        name: "آمار ارجاعات",
        url: "/dashboard/redirects/statistics",
      },
    ],
  },
];

function DashboardSidebar() {
  return (
    <div className="w-96 border-e bg-white">
      <div className="sticky top-16 flex min-h-[calc(100vh-4rem)] flex-col gap-8 px-8 py-8">
        {items.map((item) => (
          <div key={item.name} className="space-y-2">
            <span className="text-xs font-medium text-gray-400">
              {item.name}
            </span>
            <ul className="space-y-2 text-sm font-semibold text-blue-800">
              {item.items.map((item) => (
                <li
                  key={item.name}
                  className="transition duration-300 hover:text-red-600"
                >
                  <Link prefetch={false} href={item.url}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="mt-auto">
          <AdminMiniProfile />
        </div>
      </div>
    </div>
  );
}

const Layout = async ({ children, ...props }: PropsWithChildren) => {
  const { user } = await getSession();
  if (!user || !user.isAdmin) redirect("/");

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="sticky top-0 z-50 flex h-16 items-center border-b bg-white px-8 text-lg font-medium">
        پنل مدیریتی جشنواره عیدانه
      </div>
      <div className="flex flex-1">
        <DashboardSidebar />
        <div className="container flex flex-col py-8">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
