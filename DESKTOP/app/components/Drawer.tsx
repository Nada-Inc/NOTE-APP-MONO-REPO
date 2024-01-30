"use client";

import React from "react";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import { VscNotebook } from "react-icons/vsc";
import { TfiTimer } from "react-icons/tfi";
import { LiaWalletSolid } from "react-icons/lia";
import { BsPerson } from "react-icons/bs";
import { LuSettings } from "react-icons/lu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Drawer() {
  const [isOpen, setIsOpen] = React.useState(false);

  const links = [
    {
      name: "Notes",
      href: "/pages/Notes",
      icon: VscNotebook,
    },
    {
      name: "Reminder",
      href: "/pages/Reminder",
      icon: TfiTimer,
    },
    {
      name: "Track Expense",
      href: "/pages/Expense",
      icon: LiaWalletSolid,
    },
  ];

  const pathName = usePathname();

  return (
    <div className="drawer h-screen w-14 flex flex-col lg:w-80 p-1 shadow-md	z-10">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center lg:justify-start"
        data-tauri-drag-region
      >
        <Icon
          path={mdiMenu}
          size={0.8}
          className="mt-2 cursor-pointer lg:hidden"
        />
        <div className="font-extralight text-sm p-2 hidden lg:block">
          Note App
        </div>
      </div>
      <div className="mt-2">
        {/* <Link
          href="/"
          className={`flex items-center p-2 drawer-item gap-4 rounded-md mb-1 justify-center lg:justify-start cursor-default`}
        >
          <VscNotebook />
          <div className="hidden lg:block">Notes</div>
        </Link>
        <Link
          href="/pages/Reminder"
          className={`flex items-center p-2 drawer-item gap-4 rounded-md mb-1 justify-center lg:justify-start cursor-default`}
        >
          <TfiTimer />
          <div className="hidden lg:block">Reminder</div>
        </Link>
        <Link
          href="/pages/Expense"
          className={`flex items-center p-2 gap-4 rounded-md mb-1 drawer-item justify-center lg:justify-start`}
        >
          <LiaWalletSolid />
          <div className="hidden lg:block">Track Expense</div>
        </Link> */}
        {links.map((links: any) => {
          const isActive = pathName.startsWith(links.href);
          const Icon = links.icon;
          return (
            <Link
              key={links.name}
              href={links.href}
              className={
                isActive
                  ? "flex items-center p-2 gap-4 rounded-md mb-1 drawer-item justify-center lg:justify-start drawer-active"
                  : "flex items-center p-2 gap-4 rounded-md mb-1 drawer-item justify-center lg:justify-start"
              }
            >
              <Icon />
              <div className="hidden lg:block">{links.name}</div>
            </Link>
          );
        })}
      </div>
      <div className="mt-auto">
        <div
          className={`flex items-center gap-4 p-2 drawer-item rounded-md mb-1 justify-center lg:justify-start`}
        >
          <BsPerson />
          <div className="hidden lg:block">Sign In</div>
        </div>
        <div
          className={`flex items-center p-2 drawer-item gap-4 rounded-md mb-1 justify-center lg:justify-start`}
        >
          <LuSettings />
          <div className="hidden lg:block">Settings</div>
        </div>
      </div>
    </div>
  );
}
