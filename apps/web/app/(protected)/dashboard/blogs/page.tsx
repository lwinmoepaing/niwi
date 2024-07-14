import Button from "@/components/niwi-ui/button/button";
import Link from "next/link";

function BlogsLandingPage() {
  return (
    <div className="flex flex-row justify-between">
      <p className="dark:text-white">Blog Lists</p>

      <Link href="/dashboard/blogs/create">
        <Button>Create new blog</Button>
      </Link>
    </div>
  );
}
export default BlogsLandingPage;
