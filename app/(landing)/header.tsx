import React from "react";
import { PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const items = [
  { name: "عیدانه", url: "", icon: null },
  { name: "مسابقه", url: "", icon: null },
  {
    name: "امتیازات",
    url: "",
    icon: null,
  },
  { name: " گردونه شانس", url: "", icon: null },
  { name: "محصولات شگفت انگیز", url: "", icon: <PartyPopper /> },
];
const Header = () => {
  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[9999] h-20 bg-black/60 text-gray-50 backdrop-blur",
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
        <ul className="mx-auto flex items-center gap-8 pe-28">
          {items.map((item) => (
            <li className="flex items-center gap-2" key={item.name}>
              {item.icon}
              <a href="">{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
