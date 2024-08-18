import Button from "@/components/niwi-ui/button/button";
import { cn } from "@/libs/utils";
import usePomodoro from "../hooks/usePomodoro";

type PomodoroTimerItemProps = {
  minutes: number;
  show: boolean;
};

function PomodoroTimerItem({ minutes, show }: PomodoroTimerItemProps) {
  const {
    audioRef,
    isStart,
    isActive,
    isFinishedTimer,
    time,
    formatTime,
    addTime,
    handleStartTimer,
    handleResumePause,
    handleReset,
  } = usePomodoro({ minutes });

  return (
    <div className={cn(show ? "block" : "hidden")}>
      <div className="text-6xl mb-5">{formatTime(time)}</div>

      <div className="my-5 flex flex-row gap-x-[10px] justify-center text-sm">
        <button
          onClick={() => addTime(25)}
          className="opacity-50 hover:opacity-100"
        >
          + 25 min
        </button>
        <button
          onClick={() => addTime(10)}
          className="opacity-50 hover:opacity-100"
        >
          + 10 min
        </button>
        <button
          onClick={() => addTime(5)}
          className="opacity-50 hover:opacity-100"
        >
          + 5 min
        </button>
        <button
          onClick={() => addTime(1)}
          className="opacity-50 hover:opacity-100"
        >
          + 1 min
        </button>
      </div>

      <div className="flex flex-row gap-x-[10px] justify-center">
        {!isStart && (
          <Button onClick={handleStartTimer} variant={"outline"}>
            Start
          </Button>
        )}

        {isStart && (
          <>
            {!isFinishedTimer && (
              <Button
                onClick={handleResumePause}
                variant={"outline"}
                className=""
              >
                {isActive ? "Pause" : "Resume"}
              </Button>
            )}

            <Button onClick={handleReset} variant={"outline"} className="">
              Reset
            </Button>
          </>
        )}
      </div>

      <audio className="hidden" ref={audioRef} src="/sounds/alarm.mp3" />
    </div>
  );
}
export default PomodoroTimerItem;
