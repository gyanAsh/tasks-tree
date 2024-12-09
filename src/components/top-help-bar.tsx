import React, { ReactNode } from "react";
import { CustomSidebarToggle } from "./app/client";
import { ThemeToggle } from "./theme-button";
import { Separator } from "./ui/separator";

const HelpBar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full gap-2 p-2">
        <CustomSidebarToggle />
        <Separator orientation="vertical" />
        <ThemeToggle />
      </div>
      {children}
    </div>
  );
};

export default HelpBar;
