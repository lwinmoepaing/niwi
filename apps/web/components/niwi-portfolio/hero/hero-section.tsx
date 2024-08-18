import Image from "next/image";

const HeroSection = ({ name, message }: { name: string; message: string }) => {
  return (
    <section className="w-full max-w-[720px] mx-auto mt-20">
      <div className="gap-3 flex justify-between">
        <div>
          <span className="relative flex shrink-0 overflow-hidden rounded-full size-28 border">
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
          <div className="flex">
            <span className="inline-block text-2xl tracking-tighter sm:text-4xl xl:text-5xl/none">
              Hi, I'm {name} 👋
            </span>
          </div>
          <div className="flex">
            <span className="inline-block max-w-[600px] md:text-xl">
              {message}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
