import Image from "next/image";

export const WorkHistoryImage = ({
  url,
  alt,
}: {
  url: string;
  alt: string;
}) => {
  return (
    <div className="flex-none">
      <span className="relative flex shrink-0 overflow-hidden rounded-[21px] border dark:border-[#3c3b3c] size-12 m-auto bg-muted-background dark:bg-foreground">
        <Image
          className="h-full w-full object-contain"
          alt={alt}
          src={url}
          fill
        />
      </span>
    </div>
  );
};
