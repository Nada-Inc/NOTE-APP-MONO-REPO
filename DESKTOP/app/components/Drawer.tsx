"use client";

import React from "react";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import { mdiWindowClose } from "@mdi/js";
import { mdiFilePlus, mdiTimerAlert } from "@mdi/js";
import { VscNotebook } from "react-icons/vsc";
import { TfiTimer } from "react-icons/tfi";
import { LiaWalletSolid } from "react-icons/lia";
import { BsPerson } from "react-icons/bs";
import { LuSettings } from "react-icons/lu";
import Image from "next/image";
import noteapplogo from "../../public/notes.png";
import { animated, useTransition } from "react-spring";
import Link from "next/link";

export default function Drawer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isActive, setIsActive] = React.useState("note");

  const transitions: any = useTransition(isOpen, {
    from: { position: "fixed", opacity: 0, width: 0 },
    enter: { opacity: 1, width: 320 },
    leave: { opacity: 0, width: 0 },
  });

  console.log(typeof transitions);

  return (
    <div className="drawer h-screen w-14 flex flex-col lg:w-80 p-1 shadow-md	z-10">
      {/* {transitions?.map(
        ({ item, key, props }: any) =>
          item && (
            <animated.div
              key={key}
              style={{ opacity: props.opacity }}
              className="overlay"
            >
              <animated.div style={{ width: props.width }} className="drawer">
                Hey look it's a side drawer!
              </animated.div>
              <div className="fill" onClick={() => setIsOpen(!isOpen)} />
            </animated.div>
          )
      )} */}
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
        <div
          className={`flex items-center p-2 drawer-item gap-4 rounded-md mb-1 justify-center lg:justify-start`}
        >
          <VscNotebook />
          <div className="hidden lg:block">Notes</div>
        </div>
        <div className="">
          <Link
            href="/Reminder"
            className={`flex items-center p-2 drawer-item gap-4 rounded-md mb-1 justify-center lg:justify-start`}
          >
            <TfiTimer />
            <div className="hidden lg:block">Reminder</div>
          </Link>
        </div>
        <div className="">
          <div
            className={`flex items-center p-2 gap-4 rounded-md mb-1 drawer-item justify-center lg:justify-start`}
          >
            <LiaWalletSolid />
            <div className="hidden lg:block">Track Expense</div>
          </div>
        </div>
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
