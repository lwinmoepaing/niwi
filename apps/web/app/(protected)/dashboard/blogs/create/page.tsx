import { auth } from "@/libs/auth/next-auth";
import CreateBlogForm from "../assets/components/create-blog-form";

async function NewBlogCreatePage() {
  const session = await auth();

  return (
    <article>
      <CreateBlogForm currentAuthId={session?.user?.id} />
    </article>
  );
}
export default NewBlogCreatePage;
