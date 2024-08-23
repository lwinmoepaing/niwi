import Button from "@/components/niwi-ui/button/button";
import Link from "next/link";
import React from "react";
import MemoryCardItem from "./assets/components/memory-card-item";
import MemoryCardContainer from "./assets/components/memory-card-container";
import MemoryLevel from "./assets/components/memory-level";

export default function page() {
  return (
    <>
      <section className="w-full max-w-[760px] mx-auto px-[20px] mt-[40px] mb-[20px]">
        <Link href="/mini-apps">
          <Button variant={"niwi"}>Go Mini Apps</Button>
        </Link>
      </section>
      <section className="max-w-[760px] mx-auto px-[20px] mb-8 ">
        <div className="mt-[20px] px-[10px] md:px-[20px] py-12 bg-white dark:bg-[#111119] rounded-xl">
          <MemoryLevel />
        </div>
      </section>
    </>
  );
}
