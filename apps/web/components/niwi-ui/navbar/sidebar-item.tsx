"use client";

import { cn } from "@/libs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

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

  const isActive = useMemo(() => {
    if (pathName === "/dashboard") {
      return href === pathName;
    }

    const pathCount = href.split("/").length;
    if (pathCount === 2) {
      return pathName === href;
    }

    return pathName.includes(href);
  }, [href, pathName]);

  return (
    <Link
      href={href}
      className={cn(
        "niwi-sidebar-item",
        isActive ? "niwi-sidebar-item-active" : ""
      )}
    >
      {icon}
      <span className="hidden md:block text-[10px] mt-1">{children}</span>
    </Link>
  );
}
