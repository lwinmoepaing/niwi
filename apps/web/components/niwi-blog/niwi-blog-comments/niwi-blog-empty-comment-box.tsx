import Image from "next/image";

function NiwiBLogEmptyCommentBox() {
  return (
    <section className="niwi-blog-comment-item">
      <div className="profile-section-container">
          <p className="tracking-wider flex flex-row w-full justify-center items-center gap-x-2 mb-4">
          <Image
            src={"/images/icons/blog.gif"}
            alt={"Blogs"}
            width={25}
            height={25}
            className="relative top-[-2px]"
          />
          Empty Comments
        </p>
      </div>
    </section>
  );
}
export default NiwiBLogEmptyCommentBox;
