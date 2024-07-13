import Image from "next/image";
import Button from "../button/button";
import SidebarItem from "./sidebar-item";
import SignOutButton from "@/app/(feat)/auth/assets/components/SignOutButton";

const iconSize = 14;

const sideBarItems = [
  {
    name: "Home",
    href: "/dashboard",
    icon: (_props: { size: number }) => (
      <Image
        src={"/images/icons/house.gif"}
        alt={"Home"}
        width={25}
        height={25}
      />
    ),
  },
  {
    name: "Blog",
    href: "/dashboard/blogs",
    icon: (_props: { size: number }) => (
      <Image
        src={"/images/icons/blog.gif"}
        alt={"Blogs"}
        width={25}
        height={25}
      />
    ),
  },
];

export default async function SideBar() {
  return (
    <aside className="niwi-sidebar">
      <ul>
        {sideBarItems.map((item) => (
          <li key={item.name}>
            <SidebarItem icon={<item.icon size={iconSize} />} href={item.href}>
              {item.name}
            </SidebarItem>
          </li>
        ))}
      </ul>
      <footer className="fixed bottom-4">
        <SignOutButton text="Logout" />
      </footer>
    </aside>
  );
}
