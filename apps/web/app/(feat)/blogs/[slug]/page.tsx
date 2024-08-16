import NiwiHtmlView from "@/components/niwi-blog/niwi-html-view/niwi-html-view";
import Button from "@/components/niwi-ui/button/button";
import { getBlogBySlug } from "@/feats/blog/services/blog.service";
import { auth } from "@/libs/auth/next-auth";
import { getSeoTag } from "@/libs/seo/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import PublishBLogProfile from "../assets/components/publish-blog-profile";

type BlogDetailPageProps = { params: { slug: string } };

export async function generateMetadata({
  params: { slug },
}: BlogDetailPageProps) {
  const { data: blog, success } = await getBlogBySlug(slug);

  if (!success || !blog || !blog.isPublished) {
    return getSeoTag({
      title: "Not found blog",
      description: "Blog is not found | 404 🎉",
    });
  }

  return getSeoTag({
    title: blog.title,
    description: blog.subTitle ?? blog.title,
    image: blog.previewImage,
  });
}

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

      <section className="px-[20px]">
        <PublishBLogProfile blog={blog} currentAuth={session?.user} />
        <NiwiHtmlView htmlText={blog.content || ""} />
      </section>
    </>
  );
};
export default BlogDetailPage;
