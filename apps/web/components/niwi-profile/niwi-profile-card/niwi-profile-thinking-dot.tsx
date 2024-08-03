import { cn } from "@/libs/utils";

function NiwiProfileThinkingDots({
  isShowThinking,
}: {
  isShowThinking: boolean;
}) {
  return (
    <>
      <span
        className={cn(
          isShowThinking ? "niwi-profile-active" : "niwi-profile-inactive"
        )}
      >
        <div
          className={cn(
            "niwi-profile-thinking-dot-color niwi-profile-thinking-dot-1"
          )}
        />
      </span>
      <span
        className={cn(
          isShowThinking ? "niwi-profile-active" : "niwi-profile-inactive"
        )}
      >
        <div
          className={cn(
            "niwi-profile-thinking-dot-color niwi-profile-thinking-dot-2"
          )}
        />
      </span>
      <span
        className={cn(
          isShowThinking ? "niwi-profile-active" : "niwi-profile-inactive"
        )}
      >
        <div
          className={cn(
            "niwi-profile-thinking-dot-color niwi-profile-thinking-dot-3"
          )}
        />
      </span>
    </>
  );
}
export default NiwiProfileThinkingDots;
