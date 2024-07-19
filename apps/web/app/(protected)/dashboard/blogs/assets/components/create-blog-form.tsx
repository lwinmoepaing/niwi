"use client";
import NiwiTextEditor from "@/components/niwi-blog/niwi-text-editor/niwi-text-editor";
import Button from "@/components/niwi-ui/button/button";
import NavbarRightPortal from "@/components/niwi-ui/navbar/navbar-right-portal";
import { CircleDashed } from "lucide-react";
import useCreateBlogForm from "../hooks/useCreateBlogForm";

function CreateBlogForm() {
  const { onChangeValue, handleSubmit, editorResetKey, pending, isValidForm } =
    useCreateBlogForm();

  return (
    <>
      <NavbarRightPortal>
        <div className="w-full h-full flex justify-center items-center mr-5">
          <Button
            type="button"
            size={"md"}
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

      <NiwiTextEditor onChangeValue={onChangeValue} key={editorResetKey} />
    </>
  );
}
export default CreateBlogForm;
