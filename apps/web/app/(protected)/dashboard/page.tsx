import { BorderBeam } from "@/components/niwi-ui/border-beam/border-beam";
import Meteors from "@/components/niwi-ui/meteors/meteors";
import NiwiHero from "@/components/niwi-ui/niwi-hero/niwi-hero";

function DashboardPage() {
  return (
    <div>
      <p className="dark:text-white">Protected Dashboard Page</p>

      <section className="flex lg:flex-row">
        <div className="w-full lg:max-w-[50%] relative my-[20px] rounded-[20px] overflow-hidden">
          <Meteors number={26} />
          <BorderBeam duration={8} size={200} />
          <NiwiHero />
        </div>
      </section>
    </div>
  );
}
export default DashboardPage;
