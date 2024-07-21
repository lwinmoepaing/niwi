"use client";

import NiwiTextEditor from "@/components/niwi-blog/niwi-text-editor/niwi-text-editor";
import Button from "@/components/niwi-ui/button/button";
import NavbarRightPortal from "@/components/niwi-ui/navbar/navbar-right-portal";
import { CircleDashed } from "lucide-react";
import useEditBlogForm from "../hooks/useEditBlogForm";
import PreviewPublishModal from "./preview-publish-modal";
import Link from "next/link";
import config from "@/config";
import NiwiBlogProfile from "@/components/niwi-blog/niwi-blog-profile/niwi-blog-profile";

function EditBlogForm({
  contentJson,
  content,
  blogId,
  publishStatus,
  slug,
}: {
  contentJson: string;
  content: string;
  blogId: string;
  publishStatus: boolean;
  slug: string;
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
    contentJson,
    content,
    blogId,
    publishStatus,
    slug,
  });

  return (
    <>
      <NavbarRightPortal>
        <div className="w-full h-full flex justify-center gap-x-4 items-center mr-6">
          <Button
            type="button"
            variant={"success"}
            size={"md"}
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
              size={"md"}
              disabled={!isValidPublish}
              onClick={togglePreviewModal}
            >
              Publish
            </Button>
          ) : (
            <Link href={`${config.domainUrl}/blogs/${slugName}`}>
              <Button type="button" size={"md"}>
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
        blogId={blogId}
        onSuccess={handleOnPublishingSuccess}
      />

      <NiwiBlogProfile
        title={title || "Title will be generated from your editor..."}
        profileLink={"/dashboard"}
        profileImg={"/images/auth/profile.png"}
        profileName={"Shawn King Shawn"}
        estimateTime={"-- minutes to "}
        date={"Jun 21, 2024"}
      />

      <NiwiTextEditor
        onChangeValue={onChangeValue}
        initializeData={contentJson}
      />
    </>
  );
}
export default EditBlogForm;
