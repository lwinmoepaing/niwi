"use client";

import { cn } from "@/libs/utils";
import Link from "next/link";
// import { usePathname } from "next/navigation";

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
  // const pathName = usePathname();
  // const isActive = pathName === href;
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col justify-center items-center rounded-lg p-2 w-12 h-12 mt-6",
        // isActive
        //   ? "bg-blue-500/80 dark:hover:bg-blue-500/100 text-white"
        //   : "bg-gray-200 dark:hover:bg-blue-500/15 dark:bg-white/5 hover:bg-blue-500/20 hover:text-primary"
      )}
    >
      {icon}
      <span className="text-[10px] mt-1">{children}</span>
    </Link>
  );
}