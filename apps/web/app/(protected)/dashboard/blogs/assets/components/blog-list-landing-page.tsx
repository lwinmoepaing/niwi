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
      <NavbarRightPortal>
        <Link href="/dashboard/blogs/create" className="mr-2">
          <Button size="sm">Create new blog</Button>
        </Link>
      </NavbarRightPortal>

      <div className="flex flex-row justify-between items-center max-w-[700px] mx-auto">
        <section className="w-full flex flex-row items-center gap-x-[10px]">
          <p className="dark:text-white self-start">Blog Lists</p>
          <NiwiBlogDraftPublishSwitcher onChangeStatus={setSwitcher} />
        </section>
      </div>

      <div className="w-full">
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
          <BlogListByBookmark currentAuth={currentAuth} key={switcher} />
        )}
      </div>
    </>
  );
}
export default BlogListLandingPage;
