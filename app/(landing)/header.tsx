"use client";
import React, { useState } from "react";
import {
  X,
  PartyPopper,
  Text,
  User,
  UserRound,
  Power,
  Loader2,
  LayoutDashboardIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUser } from "@/authProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { authSignOut } from "@/server/actions/auth";
import Link from "next/link";

const items = [
  { name: "عیدانه", url: "#hero", icon: null },
  { name: "مسابقه", url: "#game", icon: null },
  {
    name: "امتیازات",
    url: "#points",
    icon: null,
  },
  { name: " گردونه شانس", url: "#wheel", icon: null },
  { name: "محصولات شگفت انگیز", url: "#offers", icon: <PartyPopper /> },
];
const Header = () => {
  const [open, setOpen] = useState(false);
  const user = useUser();
  const signOut = useMutation({
    mutationFn: () => authSignOut(),
  });
  return (
    <>
      <header
        className={cn(
          "group peer fixed left-0 right-0 top-0 z-[999999] h-20 bg-black/60 text-gray-50 backdrop-blur",
          { open },
        )}
      >
        <div className="container flex h-full items-center justify-between font-normal">
          <Image
            className="max-w-28"
            src={"/images/ctelecom-logo.webp"}
            alt="CTelecom brand logo"
            height="300"
            width="650"
          />
          <ul className="absolute left-0 top-full mx-auto flex min-h-lvh w-full -translate-x-full flex-col gap-8 bg-black/60 px-8 py-5 backdrop-blur transition-transform duration-300 group-[.open]:translate-x-0 sm:w-auto sm:min-w-72 sm:px-5 md:relative md:top-0 md:min-h-0 md:min-w-[unset] md:translate-x-0 md:flex-row md:items-center md:bg-transparent md:py-0 md:ps-0 md:backdrop-blur-[unset] lg:pe-28">
            {items.map((item) => (
              <li
                className="flex items-center gap-2 border-b border-gray-50/50 pb-3 text-sm md:border-0 md:pb-0 lg:text-base"
                key={item.name}
              >
                {item.icon}
                <a href={item.url}>{item.name}</a>
              </li>
            ))}
          </ul>

          <div className="flex h-full items-center gap-3">
            {user ? (
              <>
                <Popover>
                  <PopoverTrigger>
                    <UserRound />
                  </PopoverTrigger>
                  <PopoverContent
                    align="end"
                    className="dark w-52 border-none bg-black/70 text-gray-50 backdrop-blur"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{user.fullName}</span>
                        <span className="text-xs">{user.phone}</span>
                      </div>
                      {signOut.isPending ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <Power
                          role={"button"}
                          onClick={() => signOut.mutate()}
                          className="text-red-600"
                          size={16}
                          strokeWidth={3}
                        />
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
                {user.isAdmin && (
                  <Link prefetch={false} href="/dashboard">
                    {" "}
                    <LayoutDashboardIcon />
                  </Link>
                )}
              </>
            ) : (
              <Link href="/auth">
                <UserRound role={"button"} onClick={() => signOut.mutate()} />
              </Link>
            )}
            <button className="md:invisible" onClick={() => setOpen((p) => !p)}>
              {open ? <X size={28} /> : <Text size={28} />}
            </button>
          </div>
        </div>
      </header>
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-[8888] bg-black/50 opacity-0 backdrop-blur transition-opacity duration-300 peer-[.open]:opacity-100 md:peer-[.open]:opacity-0" />
    </>
  );
};

export default Header;
