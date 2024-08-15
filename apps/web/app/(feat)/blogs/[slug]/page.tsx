import NiwiHtmlView from "@/components/niwi-blog/niwi-html-view/niwi-html-view";
import { getBlogBySlug } from "@/feats/blog/services/blog.service";
import { auth } from "@/libs/auth/next-auth";
import { notFound } from "next/navigation";
import PublishBLogProfile from "../assets/components/publish-blog-profile";
import Button from "@/components/niwi-ui/button/button";
import Link from "next/link";

type BlogDetailPageProps = { params: { slug: string } };

const BlogDetailPage = async ({ params: { slug } }: BlogDetailPageProps) => {
  const { data: blog, success } = await getBlogBySlug(slug);

  if (!success || !blog || !blog.isPublished) return notFound();

  const session = await auth();

  return (
    <>
      <section className="w-full max-w-[760px] mx-auto px-[20px] mt-[40px] mb-[20px]">
        <Link href="/">
          <Button variant={"niwi"}>Go Back Home</Button>
        </Link>
      </section>
      <PublishBLogProfile blog={blog} currentAuth={session?.user} />
      <NiwiHtmlView htmlText={blog.content || ""} />
    </>
  );
};
export default BlogDetailPage;
