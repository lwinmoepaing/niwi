import Navbar from "@/components/niwi-ui/navbar/navbar";
import SideBar from "@/components/niwi-ui/navbar/sidebar";

type Props = {
  children?: React.ReactNode;
};

export default async function AdminLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <section className="border-t flex flex-1 pl-[100px]">
        <SideBar />
        <main className="py-4 px-5 min-h-screen w-full">{children}</main>
      </section>
    </>
  );
}
