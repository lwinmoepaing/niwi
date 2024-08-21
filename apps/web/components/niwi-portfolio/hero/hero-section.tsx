import portfolioConfig from "@/portfolio.config";
import Image from "next/image";
import Link from "next/link";

const { hero } = portfolioConfig;

const HeroSection = () => {
  return (
    <section id="hero" className="w-full max-w-[720px] mx-auto mt-20">
      <div className="gap-3 flex justify-between">
        <div>
          <span className="relative flex shrink-0 overflow-hidden rounded-full size-28 border dark:border-[#3c3b3c]">
            <Image
              className="aspect-square h-full w-full"
              src={hero.image}
              alt={hero.welcomeMessage}
              fill
              objectFit="cover"
            />
          </span>
        </div>
        <div className="flex-col flex flex-1 space-y-1.5">
          <div className="flex text-2xl sm:text-4xl xl:text-5xl/none">
            <span className="niwi-logo-text inline-block tracking-tighter ">
              {hero.welcomeMessage}
            </span>
            <span className="inline-block ml-1">👋</span>
          </div>
          <div className="flex">
            <span className="inline-block max-w-[600px] md:text-lg">
              <>
                {hero.message} {hero.linkPrefix} <HeroLinks /> {hero.linkSuffix}
              </>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroLinks = () => {
  const isEmptyLink = hero.links.length <= 0;

  if (isEmptyLink) return null;

  return (
    <>
      {hero.links.map(({ link, name }, index) => {
        const isOneLink = hero.links.length === 1;
        const isFinishedLink = hero.links.length - 1 === index;
        const isLastBeforeOne = !isOneLink && hero.links.length - 2 === index;
        return (
          <Link
            key={link}
            className="hover:underline hover:text-purple-600 dark:hover:text-purple-400"
            href={link}
          >
            {isFinishedLink && !isOneLink ? " and " : ""}
            {name}
            {isOneLink
              ? ""
              : (isLastBeforeOne && !isOneLink) || isFinishedLink
                ? ""
                : " ,"}{" "}
          </Link>
        );
      })}
    </>
  );
};

export default HeroSection;
