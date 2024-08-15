import { lancelotFont } from "@/libs/font/font-helper";
import { cn } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LinkItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <p>
      <Link href={href} className="hover:underline mb-1">
        {children}
      </Link>
    </p>
  );
};

function Footer() {
  return (
    <footer className="w-full mt-[80px] pt-[60px] pb-[80px] mb-[40px] border-t border-[#2a2a2a]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-[40px] gap-x-[20px] w-full max-w-[1080px] px-[20px] mx-auto">
        <div className="lg:text-left">
          <h1
            className={cn(
              "mb-2 lg:mb-3 text-2xl niwi-logo-text",
              lancelotFont.className
            )}
          >
            <Image
              width={18}
              height={18}
              src="/niwi-logo.svg"
              alt="Niwi Starter"
              className="w-[18px] h-[18px] inline-block mr-1 relative top-[-2px]"
            />
            Niwi-Starter
          </h1>
          <p className="text-sm">
            Make your own blog and sexy profile with Niwi. Copyright © 2024 ~
            present All rights reserved
          </p>
        </div>
        <div className="lg:text-center text-sm">
          <h1
            className={cn(
              "lg:text-center mb-2 lg:mb-3 text-2xl",
              lancelotFont.className
            )}
          >
            {" "}
            Links{" "}
          </h1>
          <LinkItem href="https://niwi-docs.vercel.app/">
            {" "}
            Documentation{" "}
          </LinkItem>
          <LinkItem href="https://x.com/LwinMoePaingDev"> Twitter </LinkItem>
          <LinkItem href="https://github.com/lwinmoepaing/niwi/">
            {" "}
            ⭐ Github{" "}
          </LinkItem>
        </div>
        <div className="lg:text-center text-sm">
          <h1 className={cn("mb-2 lg:mb-3 text-2xl", lancelotFont.className)}>
            {" "}
            Channel{" "}
          </h1>
          <LinkItem href=" https://discord.gg/7Vpja2RKTG"> Discord </LinkItem>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
