import Image from "next/image";

type NiwiEmptyBlogProps = {
  title?: string;
  text?: string;
};

function NiwiEmptyBlog({
  title = "You have no drafts.",
  text = "Write a blog and read on Niwi.",
}: NiwiEmptyBlogProps) {
  return (
    <div className="niwi-blog-profile-container text-[16px] flex flex-col justify-center items-center gap-y-[18px]">
      <p className="niwi-logo-text font-bold text-[24px] mt-2">{title}</p>
      <p className="tracking-widest flex flex-row w-full justify-center items-center gap-x-2 mb-4">
        <Image
          src={"/images/icons/blog.gif"}
          alt={"Blogs"}
          width={25}
          height={25}
          className="relative top-[-2px]"
        />
        {text}
      </p>
    </div>
  );
}
export default NiwiEmptyBlog;
