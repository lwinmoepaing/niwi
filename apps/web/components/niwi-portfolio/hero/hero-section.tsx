import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section id="hero" className="w-full max-w-[720px] mx-auto mt-20">
      <div className="gap-3 flex justify-between">
        <div>
          <span className="relative flex shrink-0 overflow-hidden rounded-full size-28 border dark:border-[#3c3b3c]">
            <Image
              className="aspect-square h-full w-full"
              src="/images/auth/lwin-moe-paing.jpeg"
              alt="Lwin Moe Paing"
              fill
              objectFit="cover"
            />
          </span>
        </div>
        <div className="flex-col flex flex-1 space-y-1.5">
          <div className="flex text-2xl sm:text-4xl xl:text-5xl/none">
            <span className="niwi-logo-text inline-block tracking-tighter ">
              Hi, I'm Lwin Moe Paing
            </span>
            <span className="inline-block ml-1">👋</span>
          </div>
          <div className="flex">
            <span className="inline-block max-w-[600px] md:text-lg">
              <>
                Senior Frontend Engineer passionate about building and helping
                others. Catch me active on {" "}
                <Link
                  className="hover:underline hover:text-purple-600 dark:hover:text-purple-400"
                  href="https://x.com/LwinMoePaingDev"
                >
                  Twitter
                </Link>{" "}
                and{" "}
                <Link
                  className="hover:underline hover:text-purple-600 dark:hover:text-purple-400"
                  href="https://facebook.com/lwin.im"
                >
                  Facebook
                </Link>{" "}
                🎉
              </>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
