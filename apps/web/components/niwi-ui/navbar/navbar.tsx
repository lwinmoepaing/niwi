import Link from "next/link";
import { LightDarkToggle } from "../light-dark-toggler/light-dark-toggler";
import { User } from "next-auth";
import Image from "next/image";

export default function Navbar({ user }: { user?: User }) {
  return (
    <header className="niwi-navbar">
      <nav className="nav">
        <section>
          <Link href="/" className="niwi-logo-text text-2xl">
            Niwi Starter
          </Link>
        </section>
        <section className="niwi-nav-right-container">
          <div id="niwi-navbar-right-portal"></div>
          {user && (
            <Link
              className="w-[40px] h-[40px] rounded-full overflow-hidden mr-2"
              href={`/dashboard/profile/${user.shortLink}`}
            >
              <Image
                width={40}
                height={40}
                src={user?.image || "/images/auth/profile.png"}
                alt={user?.name || "-"}
              />
            </Link>
          )}
          <LightDarkToggle className="" />
        </section>
      </nav>
    </header>
  );
}
