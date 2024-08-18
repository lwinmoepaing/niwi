import Link from "next/link";
import Image from "next/image";
import { cn } from "@/libs/utils";
import { lancelotFont } from "@/libs/font/font-helper";

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
      </div>

      <div className="flex flex-row flex-wrap gap-[25px] my-5 justify-center">
        <MiniAppCard
          title="Todo List"
          body="Basic Todo List Application"
          image="/images/mini-apps/todo-list.gif"
          link="/mini-apps/todo"
        />
        <MiniAppCard
          title="Preview Url"
          body="When you paste url, it'll show ss."
          image="/images/mini-apps/screenshot.gif"
          link="/mini-apps/screenshot-url"
        />
        <MiniAppCard
          title="Pomodoro"
          body="Timer for study or progress."
          image="/images/mini-apps/pomodoro.gif"
          link="/mini-apps/pomodoro"
        />
        <MiniAppCard
          title="Coming Soon"
          body="Stay tuned for the next mini-apps."
          image="/images/niwi-blog.png"
          link="/mini-apps"
        />
      </div>
    </section>
  );
}
export default NiwiMiniAppsList;
