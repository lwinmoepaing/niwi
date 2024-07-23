export const NiwiBlogProfileSkeleton = () => {
  return (
    <div className="niwi-blog-profile-container">
      <div className="w-[70%] h-[36px] rounded-[10px] mb-[1rem] bg-gray-200 dark:bg-[#1d1f23] animate-pulse"></div>
      <div className="niwi-blog-profile-row">
        <div className="w-[44px] h-[44px] rounded-full bg-gray-200 dark:bg-[#1d1f23] animate-pulse"></div>
        <div className="flex-1 ml-[1rem]">
          <div className="w-[30%] h-[24px] mb-[0.25rem] rounded-[10px] bg-gray-200 dark:bg-[#1d1f23] animate-pulse"></div>
          <div className="w-[25%] h-[14px] rounded-[10px] bg-gray-200 dark:bg-[#1d1f23] animate-pulse"></div>
        </div>
      </div>
      <div className="mt-[1rem] h-[20px] flex flex-row pl-[6px] gap-x-[1.15rem]">
        <div className="w-[40px] h-full rounded-[6px] dark:bg-[#1d1f23] animate-pulse"></div>
        <div className="w-[40px] h-full rounded-[6px] dark:bg-[#1d1f23] animate-pulse"></div>
        <div className="w-[20px] h-full rounded-[6px] dark:bg-[#1d1f23] animate-pulse"></div>
        <div className="w-[20px] h-full rounded-[6px] dark:bg-[#1d1f23] animate-pulse"></div>
      </div>
    </div>
  );
};

export const NiwiDraftBlogProfileSkeleton = () => {
  return (
    <div className="niwi-blog-profile-container">
      <div className="w-[30%] h-[36px] rounded-[10px] mb-[1rem] bg-gray-200 dark:bg-[#1d1f23] animate-pulse"></div>
      <div className="niwi-blog-profile-row">
        <div className="w-[44px] h-[44px] rounded-full bg-gray-200 dark:bg-[#1d1f23] animate-pulse"></div>
        <div className="flex-1 ml-[1rem]">
          <div className="w-[20%] h-[24px] mb-[0.25rem] rounded-[10px] bg-gray-200 dark:bg-[#1d1f23] animate-pulse"></div>
          <div className="w-[28%] h-[14px] rounded-[10px] bg-gray-200 dark:bg-[#1d1f23] animate-pulse"></div>
        </div>
      </div>
      <div className="mt-[2px]"></div>
    </div>
  );
};
