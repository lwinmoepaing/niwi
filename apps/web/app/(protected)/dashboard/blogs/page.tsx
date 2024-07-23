import { auth } from "@/libs/auth/next-auth";
import { notFound } from "next/navigation";
import BlogListLandingPage from "./assets/components/blog-list-landing-page";

async function BlogsLandingPage() {
  const session = await auth();
  if (!session?.user?.id) return notFound();

  return <BlogListLandingPage authorId={session.user.id} />;
}
export default BlogsLandingPage;
