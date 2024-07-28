import { getBlogById } from "@/feats/blog/services/blog.service";
import { notFound } from "next/navigation";
import EditBlogForm from "../assets/components/edit-blog-form";
import { auth } from "@/libs/auth/next-auth";
import { Blog } from "@/types/blog-response";
import Link from "next/link";

type BlogDetailPageProps = { params: { id: string } };

const BlogDetailPage = async ({ params: { id } }: BlogDetailPageProps) => {
  const session = await auth();

  const { data, success } = await getBlogById(id, session?.user?.id);

  const blog = data as Blog;

  if (!success || !data || !session?.user) return notFound();

  if (blog.user.id !== session.user.id) return <> Not Permission </>;

  return (
    <article>
      <div className="max-w-[860px] mx-auto">
        <h2>
          <Link
            href="/dashboard/blogs"
            className="hover:text-blue-500 transition-all"
          >
            Blog
          </Link>{" "}
          / ID - {blog.id}
        </h2>
      </div>
      <EditBlogForm blog={blog} currentAuth={session.user} />
    </article>
  );
};
export default BlogDetailPage;
