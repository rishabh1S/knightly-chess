"use client";

import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <NextUIProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        themes={["light", "dark"]}
      >
        <Toaster position="top-center" reverseOrder={true} />
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
};
