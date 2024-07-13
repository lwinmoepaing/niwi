import Link from "next/link";
import { LightDarkToggle } from "../light-dark-toggler/light-dark-toggler";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10">
      <nav className="h-16 bg-white dark:bg-black border-b dark:border-b-[#09090b] px-5 w-full flex justify-between items-center ">
        <section>
          <Link href="/">{/*  */}</Link>
        </section>
        <section>
          <LightDarkToggle className="" />
        </section>
      </nav>
    </header>
  );
}
