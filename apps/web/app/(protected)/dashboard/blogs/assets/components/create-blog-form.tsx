"use client";
import NiwiTextEditor from "@/components/niwi-blog/niwi-text-editor/niwi-text-editor";
import Button from "@/components/niwi-ui/button/button";
import NavbarRightPortal from "@/components/niwi-ui/navbar/navbar-right-portal";
import useCreateBlogForm from "../hooks/useCreateBlogForm";

function CreateBlogForm() {
  const { onChangeValue, handleSubmit } = useCreateBlogForm();

  return (
    <>
      <NavbarRightPortal>
        <div className="w-full h-full flex justify-center items-center mr-5">
          <Button size={"md"} onClick={handleSubmit}>
            Create New Blog
          </Button>
        </div>
      </NavbarRightPortal>

      <NiwiTextEditor onChangeValue={onChangeValue} />
    </>
  );
}
export default CreateBlogForm;
