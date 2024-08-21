import Link from "next/link";
import { LightDarkToggle } from "../light-dark-toggler/light-dark-toggler";
import { User } from "next-auth";
import Image from "next/image";
import { cn } from "@/libs/utils";
import { lancelotFont } from "@/libs/font/font-helper";

export default function Navbar({ user }: { user?: User }) {
  return (
    <header className="niwi-navbar">
      <nav className="nav">
        <section className="flex flex-row gap-x-[10px]">
          <Image width={24} height={24} src="/niwi-logo.svg" alt="Niwi Logo" />
          <Link
            href="/"
            className={cn("niwi-logo-text text-3xl", lancelotFont.className)}
          >
            Niwi Starter
          </Link>
        </section>
        <section className="niwi-nav-right-container">
          <div id="niwi-navbar-right-portal"></div>
          {user && (
            <Link
              className="w-[30px] h-[30px] rounded-full overflow-hidden mr-2 relative"
              href={`/dashboard/profile/${user.shortLink}`}
            >
              <Image
                src={user?.image || "/images/auth/profile.jpg"}
                alt={user?.name || "-"}
                fill
                className=" object-cover"
              />
            </Link>
          )}
          <LightDarkToggle className="" />
        </section>
      </nav>
    </header>
  );
}
