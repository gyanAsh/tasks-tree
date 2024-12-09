"use client";
import { AlignJustify } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";

export const CustomSidebarToggle = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button variant="outline" size="icon" onClick={toggleSidebar}>
      <AlignJustify />
    </Button>
  );
};
