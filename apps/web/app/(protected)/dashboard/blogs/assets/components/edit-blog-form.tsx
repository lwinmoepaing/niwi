"use client";

import NiwiBlogProfile from "@/components/niwi-blog/niwi-blog-profile/niwi-blog-profile";
import NiwiTextEditor from "@/components/niwi-blog/niwi-text-editor/niwi-text-editor";
import Button from "@/components/niwi-ui/button/button";
import NavbarRightPortal from "@/components/niwi-ui/navbar/navbar-right-portal";
import config from "@/config";
import useBlogStore from "@/stores/blog/blog.store";
import { Blog } from "@/types/blog-response";
import { CircleDashed } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import useEditBlogForm from "../hooks/useEditBlogForm";
import PreviewPublishModal from "./preview-publish-modal";

function EditBlogForm({
  currentAuth,
  blog,
}: {
  currentAuth?: User;
  blog: Blog;
}) {
  const {
    onChangeValue,
    handleSubmit,
    handleOnPublishingSuccess,
    togglePreviewModal,
    showPreviewModal,
    savePending,
    isValidForm,
    isValidPublish,
    isPublished,
    title,
    subTitle,
    images,
    slugName,
  } = useEditBlogForm({
    contentJson: blog.contentJson || "",
    content: blog.content || "",
    blogId: blog.id,
    publishStatus: blog.isPublished,
    slug: blog.slug,
    title: blog.title,
  });

  const [currentBlog, setCurrentBlog] = useBlogStore((store) => [
    store.currentBlog,
    store.setCurrentBlog,
  ]);

  const isFavorite = useMemo(() => {
    return blog.userBlogReaction.some((item) => item.reaction === "HEART");
  }, [blog]);

  useEffect(() => {
    setCurrentBlog(blog);
  }, [blog]);

  return (
    <>
      <NavbarRightPortal>
        <div className="w-full h-full flex justify-center gap-x-4 items-center mr-6">
          <Button
            type="button"
            variant={"success"}
            size={"sm"}
            onClick={handleSubmit}
            disabled={!isValidForm}
          >
            {savePending ? (
              <>
                <CircleDashed className="animate-spin" />
              </>
            ) : (
              `Save${isPublished ? " and publish" : ""}`
            )}
          </Button>
          {!isPublished ? (
            <Button
              type="button"
              size={"sm"}
              disabled={!isValidPublish}
              onClick={togglePreviewModal}
            >
              Publish
            </Button>
          ) : (
            <Link href={`${config.domainUrl}/blogs/${slugName}`}>
              <Button type="button" size={"sm"}>
                Go Publish Page
              </Button>
            </Link>
          )}
        </div>
      </NavbarRightPortal>

      <PreviewPublishModal
        show={showPreviewModal}
        onClose={togglePreviewModal}
        title={title}
        subTitle={subTitle}
        images={images}
        blogId={blog.id}
        onSuccess={handleOnPublishingSuccess}
      />

      <NiwiBlogProfile
        blog={blog}
        isFavorite={isFavorite}
        isBookmark={(blog._count?.blogBookmarks || 0) > 0 || false}
        currentAuth={currentAuth}
        hideActions={!isPublished}
        commentCount={currentBlog?._count?.blogComments || 0}
      />

      <NiwiTextEditor
        onChangeValue={onChangeValue}
        initializeData={blog.contentJson}
      />
    </>
  );
}
export default EditBlogForm;
