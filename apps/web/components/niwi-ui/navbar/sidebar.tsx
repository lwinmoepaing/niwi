import SignOutButton from "@/app/(feat)/auth/assets/components/SignOutButton";
import Image from "next/image";
import SidebarItem from "./sidebar-item";

const sideBarItems = [
  {
    name: "Home",
    href: "/dashboard",
    icon: () => (
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
    icon: () => (
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
            <SidebarItem icon={<item.icon />} href={item.href}>
              {item.name}
            </SidebarItem>
          </li>
        ))}
      </ul>
      <footer className="fixed bottom-4 w-[100px] px-[10px]">
        <SignOutButton text="Logout" className="block w-full" />
      </footer>
    </aside>
  );
}
