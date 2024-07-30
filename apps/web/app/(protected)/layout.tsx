import Navbar from "@/components/niwi-ui/navbar/navbar";
import SideBar from "@/components/niwi-ui/navbar/sidebar";
import { auth } from "@/libs/auth/next-auth";

type Props = {
  children?: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  const session = await auth();

  return (
    <>
      <Navbar user={session?.user} />
      <section className="niwi-sidebar-container">
        <SideBar />
        <main className="py-4 px-5 min-h-screen w-full">{children}</main>
      </section>
    </>
  );
}
