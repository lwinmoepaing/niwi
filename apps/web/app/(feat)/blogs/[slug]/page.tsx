import NiwiHtmlView from "@/components/niwi-blog/niwi-html-view/niwi-html-view";
import { getBlogBySlug } from "@/feats/blog/services/blog.service";
import { notFound } from "next/navigation";

type BlogDetailPageProps = { params: { slug: string } };

const BlogDetailPage = async ({ params: { slug } }: BlogDetailPageProps) => {
  const { data, success } = await getBlogBySlug(slug);
  
  if (!success || !data || !data.isPublished) return notFound();

  return <NiwiHtmlView htmlText={data.content} />;
};
export default BlogDetailPage;
