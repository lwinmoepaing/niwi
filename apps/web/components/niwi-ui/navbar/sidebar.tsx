import { Home } from "lucide-react";
import Button from "../button/button";
import SidebarItem from "./sidebar-item";

const iconSize = 14;

const sideBarItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Blog", href: "/dashboard/blogs", icon: Home },
];

export default async function SideBar() {
  return (
    <aside className="flex fixed top-[4rem] left-0 bg-mute w-[100px] flex-col items-center justify-between h-[calc(100vh-4rem)]">
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
        <Button>Logout</Button>
      </footer>
    </aside>
  );
}
