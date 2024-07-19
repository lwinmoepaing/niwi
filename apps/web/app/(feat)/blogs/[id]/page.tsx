import NiwiHtmlView from "@/components/niwi-blog/niwi-html-view/niwi-html-view";
import { getBlogById } from "@/feats/blog/services/blog.service";
import { notFound } from "next/navigation";

type BlogDetailPageProps = { params: { id: string } };

const BlogDetailPage = async ({ params: { id } }: BlogDetailPageProps) => {
  const { data, success } = await getBlogById(id);
  if (!success || !data) return notFound();

  return <NiwiHtmlView htmlText={data.content} />;
};
export default BlogDetailPage;
