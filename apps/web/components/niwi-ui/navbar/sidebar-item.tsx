"use client";

import { cn } from "@/libs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SideBarItemProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  href: string;
};

export default function SideBarItem({
  children,
  href,
  icon,
}: SideBarItemProps) {
  const pathName = usePathname();
  const isActive = pathName === href;
  return (
    <Link
      href={href}
      className={cn(
        "niwi-sidebar-item",
        isActive && "niwi-sidebar-item-active"
      )}
    >
      {icon}
      <span className="text-[10px] mt-1">{children}</span>
    </Link>
  );
}
