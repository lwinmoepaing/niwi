"use client";

import NiwiBlogDraftCard from "@/components/niwi-blog/niwi-blog-profile/niwi-blog-draft-card";
import NiwiTextEditor from "@/components/niwi-blog/niwi-text-editor/niwi-text-editor";
import Button from "@/components/niwi-ui/button/button";
import NavbarRightPortal from "@/components/niwi-ui/navbar/navbar-right-portal";
import { CircleDashed } from "lucide-react";
import { User } from "next-auth";
import useCreateBlogForm from "../hooks/useCreateBlogForm";

function CreateBlogForm({ currentUser }: { currentUser?: User }) {
  const { onChangeValue, handleSubmit, editorResetKey, pending, isValidForm } =
    useCreateBlogForm();

  return (
    <>
      <NavbarRightPortal>
        <div className="w-full h-full flex justify-center items-center mr-5">
          <Button
            type="button"
            size={"sm"}
            onClick={handleSubmit}
            className="min-w-[142px]"
            disabled={!isValidForm}
          >
            {pending ? (
              <>
                <CircleDashed className="animate-spin" />
              </>
            ) : (
              "Create New Blog"
            )}
          </Button>
        </div>
      </NavbarRightPortal>

      <NiwiBlogDraftCard
        title={"Title will be generated when you published..."}
        profileLink={`/dashboard/profile/${currentUser?.id || ""}`}
        profileImg={currentUser?.image || "/images/auth/profile.jpg"}
        profileName={currentUser?.name || "-"}
        estimateTime={"estimate time to "}
        date={"Jun 21, 2024"}
        currentAuthId={currentUser?.id}
        blogId={""}
      />

      <NiwiTextEditor onChangeValue={onChangeValue} key={editorResetKey} />
    </>
  );
}
export default CreateBlogForm;
