import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import BlurIn from "@/components/magicui/blur-in";
import { BorderBeam } from "@/components/magicui/border-beam";
import { cn } from "@/lib/utils";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

function Floating({
  delay,
  className,
  children,
  position = "center",
  duration = 1,
  rotate = false,
}) {
  const isLeft = position === "left";
  const isRight = position === "right";

  return (
    <motion.div
      className={className}
      animate={["initial"]}
      variants={{
        rotate: {
          rotate: [null, -5, 5, 0],
          transition: {
            duration: 10,
          },
        },
        initial: {
          y: isLeft || isRight ? [-2, 2] : [-1, 1],
          x: isLeft ? [-2, 2] : isRight ? [2, 4] : [0, 0],
          rotate: isRight ? [0, 2] : isLeft ? [-2, 0] : [0, 0],
          transition: {
            delay,
            duration,
            repeat: Infinity,
            repeatDelay: 0.2,
            repeatType: "reverse",
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

function HomepageHeader() {
  return (
    <header className="container">
      <div className="mx-auto max-w-[650px] my-28 relative rounded-[10px]">
        <BorderBeam duration={5} size={170} />
        <img src="/landing/niwi-starter.svg" />

        <Floating
          delay={0}
          className={"absolute w-[150px] -top-5 -left-5"}
          position="left"
          duration={0.9}
        >
          <img src="/landing/next-js-arrow.png" />
        </Floating>

        <Floating
          delay={0.05}
          className={"absolute w-[54px] -top-16 left-[48%] -translate-x-[50%]"}
          duration={2}
        >
          <img src="/landing/tailwind-arrow.png" />
        </Floating>

        <Floating
          delay={0.08}
          className="absolute w-[152px] -top-16 -right-5"
          position="right"
          duration={1.5}
        >
          <img src="/landing/mail-gun-arrow.png" />
        </Floating>

        <Floating
          delay={0.12}
          className="absolute w-[90px] -bottom-5 -left-5"
          position="left"
        >
          <img src="/landing/next-auto-arrow.png" />
        </Floating>

        <Floating
          delay={0.16}
          className="absolute w-[48px] -bottom-20 left-[48%] -translate-x-[50%]"
        >
          <img src="/landing/mongo-arrow.png" />
        </Floating>

        <Floating
          delay={0.2}
          className="absolute w-[124px] -bottom-5 -right-5 "
          position="right"
        >
          <img src="/landing/stripe-arrow.png" />
        </Floating>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`} description="This is Niwi-Starter...">
      <HomepageHeader />
      <section className="mx-auto max-w-[600px] mt-2 px-[20px]">
        <div className="z-10 flexitems-center justify-center">
          <Link href="/docs/intro">
            <AnimatedGradientText className="cursor-pointer mb-5">
              🎉 <hr className="mx-2 h-4 w-[1px] shrink-0" />{" "}
              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                )}
              >
                Introducing Niwi-Starter
              </span>
              <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
          </Link>
        </div>
        <BlurIn
          word="Why start from scratch? With Niwi Starter, your next big idea is just a click away. Learn, build, and launch faster than ever."
          className="text-lg bg-gradient-to-r from-[#F43F5E] via-[#7E22CE] to-[#60A5FA] inline-block text-transparent bg-clip-text"
        />
      </section>
    </Layout>
  );
}
