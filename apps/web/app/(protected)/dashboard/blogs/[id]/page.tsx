import { getBlogById } from "@/feats/blog/services/blog.service";
import { notFound } from "next/navigation";
import EditBlogForm from "../assets/components/edit-blog-form";

type BlogDetailPageProps = { params: { id: string } };

const BlogDetailPage = async ({ params: { id } }: BlogDetailPageProps) => {
  const { data, success } = await getBlogById(id);
  if (!success || !data) return notFound();

  return (
    <article>
      <EditBlogForm
        contentJson={data.contentJson}
        content={data.content}
        blogId={data.id}
        publishStatus={data.isPublished}
        slug={data.slug}
        title={data.title}
      />
    </article>
  );
};
export default BlogDetailPage;
