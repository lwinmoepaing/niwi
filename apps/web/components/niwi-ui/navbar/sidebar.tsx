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
      <footer className="fixed bottom-4 w-[100px] px-[10px]">
        <SignOutButton text="Logout" className="block w-full" />
      </footer>
    </aside>
  );
}
