import { lancelotFont } from "@/libs/font/font-helper";
import { cn } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";

const MiniAppCard = ({
  title,
  body,
  image,
  link,
}: {
  title: string;
  body: string;
  image: string;
  link: string;
}) => {
  return (
    <Link href={link}>
      <div className="w-[345px] bg-white dark:bg-[#111119] rounded-xl overflow-hidden border border-[#dfdfdf] dark:border-[#15151a]">
        <div className="w-full h-[190px] relative">
          <Image src={image} fill alt="TodoApp" className="object-cover" />
        </div>
        <div className="pb-[30px] pt-[23px] text-center">
          <h2 className="text-lg niwi-logo-text mb-1">{title}</h2>
          <p className="text-xs"> {body}</p>
        </div>
      </div>
    </Link>
  );
};

function NiwiMiniAppsList() {
  const list = [
    {
      title: "Todo List",
      body: "Basic Todo List Application",
      image: "/images/mini-apps/todo-list.jpg",
      link: "/mini-apps/todo",
    },
    {
      title: "Preview Url",
      body: "When you paste url, it'll show ss.",
      image: "/images/mini-apps/screenshot.jpg",
      link: "/mini-apps/screenshot-url",
    },
    {
      title: "Pomodoro",
      body: "Timer for study or progress.",
      image: "/images/mini-apps/pomodoro.jpg",
      link: "/mini-apps/pomodoro",
    },
    {
      title: "Tic Tac Toe",
      body: "Tic Tac Toe Game for Having fun.",
      image: "/images/mini-apps/tic-tac-toe.jpg",
      link: "/mini-apps/tic-tac-toe",
    },
    // {
    //   title: "Coming Soon",
    //   body: "Stay tuned for the next mini-apps.",
    //   image: "/images/niwi-blog.png",
    //   link: "/mini-apps",
    // },
  ] as const;

  return (
    <section className="max-w-[760px] mx-auto px-[20px] mb-8">
      <div className="text-center">
        <h1
          className={cn(
            "text-center text-4xl niwi-logo-text",
            lancelotFont.className
          )}
        >
          Mini-Apps
        </h1>

        <p className="my-2"> This is for learning purposes, provided by Niwi-Starter.</p>
      </div>

      <div className="flex flex-row flex-wrap gap-[25px] my-5 justify-center">
        {list.map((item) => (
          <MiniAppCard
            title={item.title}
            body={item.body}
            image={item.image}
            link={item.link}
          />
        ))}
      </div>
    </section>
  );
}
export default NiwiMiniAppsList;
