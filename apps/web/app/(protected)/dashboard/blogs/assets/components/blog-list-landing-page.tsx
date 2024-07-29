"use client";

import NiwiBlogDraftPublishSwitcher from "@/components/niwi-blog/niwi-blog-tools/niwi-blog-draft-publish-switch";
import Button from "@/components/niwi-ui/button/button";
import NavbarRightPortal from "@/components/niwi-ui/navbar/navbar-right-portal";
import Link from "next/link";
import { useState } from "react";
import BlogListByAuthor from "./blog-list-by-author";
import { User } from "next-auth";
import BlogListByBookmark from "./blog-list-by-bookmark";

function BlogListLandingPage({
  authorId,
  currentAuth,
}: {
  authorId: string;
  currentAuth?: User;
}) {
  const [switcher, setSwitcher] = useState<"Draft" | "Publish" | "Bookmark">(
    "Draft"
  );

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <section className="w-full md:max-w-[60%] flex flex-row items-center gap-x-[10px]">
          <p className="dark:text-white">Blog Lists</p>
          <NiwiBlogDraftPublishSwitcher onChangeStatus={setSwitcher} />
        </section>

        <NavbarRightPortal>
          <Link href="/dashboard/blogs/create" className="mr-2">
            <Button>Create new blog</Button>
          </Link>
        </NavbarRightPortal>
      </div>

      <div className="w-full md:max-w-[60%]">
        {switcher === "Draft" && (
          <BlogListByAuthor
            authorId={authorId}
            publishStatus={false}
            key={switcher}
            currentAuth={currentAuth}
          />
        )}
        {switcher === "Publish" && (
          <BlogListByAuthor
            authorId={authorId}
            publishStatus={true}
            key={switcher}
            currentAuth={currentAuth}
          />
        )}
        {switcher === "Bookmark" && (
          <BlogListByBookmark currentAuth={currentAuth} />
        )}
      </div>
    </>
  );
}
export default BlogListLandingPage;
