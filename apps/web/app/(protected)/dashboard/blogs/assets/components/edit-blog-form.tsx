"use client";

import NiwiTextEditor from "@/components/niwi-blog/niwi-text-editor/niwi-text-editor";
import Button from "@/components/niwi-ui/button/button";
import NavbarRightPortal from "@/components/niwi-ui/navbar/navbar-right-portal";
import useEditBlogForm from "../hooks/useEditBlogForm";
import { CircleDashed } from "lucide-react";
import PreviewPublishModal from "./preview-publish-modal";

function EditBlogForm({
  contentJson,
  content,
  blogId,
  publishStatus,
}: {
  contentJson: string;
  content: string;
  blogId: string;
  publishStatus: boolean;
}) {
  const {
    onChangeValue,
    handleSubmit,
    showPreviewModal,
    togglePreviewModal,
    savePending,
    isValidForm,
    isValidPublish,
  } = useEditBlogForm({
    contentJson,
    content,
    blogId,
    publishStatus,
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
              "Save"
            )}
          </Button>
          <Button
            type="button"
            size={"md"}
            disabled={!isValidPublish}
            onClick={togglePreviewModal}
          >
            Publish
          </Button>
        </div>
      </NavbarRightPortal>

      <PreviewPublishModal
        show={showPreviewModal}
        onClose={togglePreviewModal}
      />

      <NiwiTextEditor
        onChangeValue={onChangeValue}
        initializeData={contentJson}
      />
    </>
  );
}
export default EditBlogForm;
