import Navbar from "@/components/niwi-ui/navbar/navbar";
import SideBar from "@/components/niwi-ui/navbar/sidebar";

type Props = {
  children?: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <section className="niwi-sidebar-container">
        <SideBar />
        <main className="py-4 px-5 min-h-screen w-full">{children}</main>
      </section>
    </>
  );
}
