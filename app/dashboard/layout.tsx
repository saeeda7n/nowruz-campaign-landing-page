import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { Loader } from "lucide-react";

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
      { name: "پاسخ های ثبت شده", url: "/dashboard/answers" },
    ],
  },
  {
    name: "گزارشات",
    items: [
      { name: "تعداد شرکت کنندگان", url: "" },
      { name: "شرکت کنندگان در قرعه کشی", url: "" },
      { name: "آمار شرکت در کتاب سوالات", url: "" },
      { name: "آمار شرکت در گردانه شانس", url: "" },
      { name: "آمار پیامک های ارسال شده", url: "" },
    ],
  },
];

function DashboardSidebar() {
  return (
    <div className="w-96 border-e bg-white">
      <div className="sticky top-16 space-y-8 px-8 py-8">
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
      </div>
    </div>
  );
}

const Layout = ({ children, ...props }: PropsWithChildren) => {
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
