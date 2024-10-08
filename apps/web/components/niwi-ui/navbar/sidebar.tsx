import SignOutButton from "@/app/(feat)/auth/assets/components/SignOutButton";
import { Book, CircleDollarSign, HomeIcon } from "lucide-react";
import SidebarItem from "./sidebar-item";

const sideBarItems = [
  {
    name: "Home",
    href: "/dashboard",
    icon: () => <HomeIcon size={14} />,
  },
  {
    name: "Blog",
    href: "/dashboard/blogs",
    icon: () => <Book size={14} />,
  },
  {
    name: "Payment",
    href: "/dashboard/payments",
    icon: () => <CircleDollarSign size={14} />,
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
      <footer className="fixed bottom-4 w-[50px] md:w-[65px] px-[10px]">
        <SignOutButton
          text="Logout"
          withMobileIcon={true}
          className="w-[34px] h-[34px] md:block md:w-full px-0 py-0"
        />
      </footer>
    </aside>
  );
}
