"use client";
import { useEffect, useState } from "react";
import { WebviewWindow } from "@tauri-apps/api/window";
import React from "react";
import Icon from "@mdi/react";
import { mdiMinus } from "@mdi/js";
import { mdiCheckboxBlankOutline } from "@mdi/js";
import { mdiClose } from "@mdi/js";

export default function TitleBar() {
  const [appWindow, setAppWindow] = useState<WebviewWindow>();
  async function setupAppWindow() {
    const appWindow = (await import("@tauri-apps/api/window")).appWindow;
    setAppWindow(appWindow);
  }

  useEffect(() => {
    setupAppWindow();
  }, []);

  function windowMinimize() {
    appWindow?.minimize();
  }
  function windowToggleMaximize() {
    appWindow?.toggleMaximize();
  }
  function windowClose() {
    appWindow?.close();
  }
  return (
    <div
      data-tauri-drag-region
      className="flex justify-end items-center top-0 h-8"
    >
      <div className="flex gap-6 items-center px-6 mt-2">
        <div onClick={windowMinimize}>
          <Icon
            className="cursor-pointer"
            id="titlebar-minimize"
            path={mdiMinus}
            size={0.8}
          />
        </div>
        <div onClick={windowToggleMaximize}>
          <Icon
            className="cursor-pointer"
            id="titlebar-maximize"
            path={mdiCheckboxBlankOutline}
            size={0.5}
          />
        </div>
        <div onClick={windowClose}>
          <Icon
            id="titlebar-close"
            className="cursor-pointer"
            path={mdiClose}
            size={0.8}
          />
        </div>
      </div>
    </div>
  );
}
