import { auth } from "@/libs/auth/next-auth";
import CreateBlogForm from "../assets/components/create-blog-form";
import Link from "next/link";

async function NewBlogCreatePage() {
  const session = await auth();

  return (
    <article>
      <div className="max-w-[720px] mx-auto">
        <h2>
          <Link
            href="/dashboard/blogs"
            className="hover:text-blue-500 transition-all"
          >
            Blog
          </Link>{" "}
          / Create New Blog
        </h2>
      </div>
      <CreateBlogForm currentUser={session?.user} />
    </article>
  );
}
export default NewBlogCreatePage;
