"use client";

import * as React from "react";
import {
  FluentProvider,
  teamsDarkTheme,
  SSRProvider,
  RendererProvider,
  createDOMRenderer,
  renderToStyleElements,
  webLightTheme,
} from "@fluentui/react-components";
import { useServerInsertedHTML } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const [renderer] = React.useState(() => createDOMRenderer());

  useServerInsertedHTML(() => {
    return <>{renderToStyleElements(renderer)}</>;
  });

  return (
    <RendererProvider renderer={renderer}>
      <SSRProvider>
        <FluentProvider theme={webLightTheme} className="ml-1">
          {children}
        </FluentProvider>
      </SSRProvider>
    </RendererProvider>
  );
}
