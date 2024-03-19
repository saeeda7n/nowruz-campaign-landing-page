import React, { cache, useMemo } from "react";
import { getDashboardData } from "@/server/actions/dashboard/statistics";
import { formatDistance } from "date-fns";
import { faIR } from "date-fns/locale";
import {
  LinkIcon,
  Mail,
  MessageCircleQuestion,
  TicketPercent,
  Users,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const Page = async () => {
  const statistics = await getDashboardData();
  const cards = [
    {
      name: "کاربران",
      icon: <Users size="16" className="opacity-80" />,
      info: "کاربران عضو شده تاکنون",
      value: `${statistics.usersCount.toLocaleString()} نفر`,
    },
    {
      name: "پیامک",
      icon: <Mail size="16" className="opacity-80" />,
      info: "پیامک های ارسال شده تاکنون",
      value: `${statistics.textMessagesCount.toLocaleString()} پیامک`,
    },
    {
      name: "کد تخفیف",
      icon: <TicketPercent size="16" className="opacity-80" />,
      info: "کد های تخفیف ایجاد شده تاکنون",
      value: `${statistics.discountCodeCount.toLocaleString()} کد تخفیف`,
    },
    {
      name: "ارجاعات به فروشگاه",
      icon: <LinkIcon size="16" className="opacity-80" />,
      info: "تعداد دفعال ارجاع به فروشگاه سی تلکام",
      value: `${statistics.redirectsCount.toLocaleString()} کلیک`,
    },
    {
      name: "جواب ها",
      icon: <MessageCircleQuestion size="16" className="opacity-80" />,
      info: "جواب های ثبت شده تاکنون",
      value: `${statistics.answersCount.toLocaleString()} جواب`,
    },
  ];
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-5 gap-5">
        {cards.map((card) => (
          <div
            key={card.name}
            className="space-y-4 rounded-2xl border bg-white px-8 py-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{card.name}</span>
              {card.icon}
            </div>
            <div className="">
              <div className="text-lg font-bold">{card.value}</div>
              <p className="text-xs text-gray-400">{card.info}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5">
        <UsersTable latestUsers={statistics.latestUsers} />
        <DiscountsTable latestDiscountCodes={statistics.latestDiscountCodes} />
        <TextMessagesTable latestTextMessages={statistics.latestTextMessages} />
      </div>
    </div>
  );
};

function TextMessagesTable({
  latestTextMessages,
}: Pick<Awaited<ReturnType<typeof getDashboardData>>, "latestTextMessages">) {
  return (
    <div className="col-span-2 flex flex-col gap-y-5 rounded-2xl border bg-white px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Users size="18" />
          جدیدترین پیام های ارسال شده
        </div>
        <Link
          className="text-xs font-medium text-blue-800"
          href="/dashboard/messages"
        >
          مشاهده بیشتر
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px] text-right">شماره تلفن</TableHead>
            <TableHead className="text-right">نام و نام خانوادگی</TableHead>
            <TableHead className="truncate text-right">پیام</TableHead>
            <TableHead className="text-right">زمان ارسال</TableHead>
            <TableHead className="text-right">زمان تحویل</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {latestTextMessages.map((message) => (
            <TableRow key={message.id}>
              <TableCell>{message.receiver.phone}</TableCell>
              <TableCell>{message.receiver.fullName}</TableCell>
              <TableCell className="max-w-56 truncate">
                {message.message}
              </TableCell>
              <TableCell>
                {formatDistance(Date.now(), message.createdAt)} {" پیش"}
              </TableCell>
              <TableCell>
                {message.deliveredAt
                  ? formatDistance(Date.now(), message.deliveredAt) + " پیش"
                  : "در انتظار تحویل"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function UsersTable({
  latestUsers,
}: Pick<Awaited<ReturnType<typeof getDashboardData>>, "latestUsers">) {
  return (
    <div className="flex flex-col gap-y-5 rounded-2xl border bg-white px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Users size="18" />
          جدیدترین کاربران عضو شده
        </div>
        <Link
          className="text-xs font-medium text-blue-800"
          href="/dashboard/users"
        >
          مشاهده بیشتر
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-right">شماره تلفن</TableHead>
            <TableHead className="text-right">نام و نام خانوادگی</TableHead>
            <TableHead className="text-right">زمان عضویت</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {latestUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>
                {formatDistance(user.createdAt, Date.now(), {
                  locale: faIR,
                })}{" "}
                پیش
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function DiscountsTable({
  latestDiscountCodes,
}: Pick<Awaited<ReturnType<typeof getDashboardData>>, "latestDiscountCodes">) {
  return (
    <div className="flex flex-col gap-y-5 rounded-2xl border bg-white px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Users size="18" />
          جدیدترین کدهای تخفیف ایجاد شده
        </div>
        <Link
          className="text-xs font-medium text-blue-800"
          href="/dashboard/discounts"
        >
          مشاهده بیشتر
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-right">کد تخفیف</TableHead>
            <TableHead className="text-right">نام و نام خانوادگی</TableHead>
            <TableHead className="text-right">ارزش</TableHead>
            <TableHead className="text-right">زمان ایجاد</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {latestDiscountCodes.map((code) => (
            <TableRow key={code.id}>
              <TableCell>{code.code}</TableCell>
              <TableCell>{code.user.fullName}</TableCell>
              <TableCell>{code.value.toLocaleString()}</TableCell>
              <TableCell>
                {formatDistance(code.createdAt, Date.now(), {
                  locale: faIR,
                })}{" "}
                پیش
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Page;
