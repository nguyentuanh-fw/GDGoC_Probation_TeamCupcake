import React from "react";
import { Button } from "../../../../components/ui/button";
import { Link } from "react-router-dom";

const navigationItems = [
  { label: "HOME", href: "/" },
  { label: "Q&A", href: "/q-a" },
  { label: "HISTORY", href: "/history" },
  { label: "AI CHAT", href: "/ai-chat", isHighlighted: true },
  { label: "MENU", href: "/menu" },
];

export const HeaderSection = (): JSX.Element => {
  return (
    <header className="absolute top-0 left-0 w-full h-[140px] flex items-center justify-end gap-[60px] px-[100px] py-11">
      {navigationItems.map((item, index) => (
        <Button
          key={index}
          variant="ghost"
          asChild
          className={`h-auto p-0 [text-shadow:8px_8px_24px_#12121229] [font-family:'Bebas_Neue',Helvetica] font-normal text-[40px] tracking-[1.60px] leading-[normal] whitespace-nowrap hover:bg-transparent transition-colors ${
            item.isHighlighted ? "text-[#c3423f]" : "text-[#121212] hover:text-[#c3423f]"
          }`}
        >
          <Link to={item.href}>
            {item.label}
          </Link>
        </Button>
      ))}
</header>
  );
};