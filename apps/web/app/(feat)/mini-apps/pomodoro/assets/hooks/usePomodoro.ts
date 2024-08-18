import dateUtil from "@/libs/date/date-util";
import { Duration } from "dayjs/plugin/duration";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type UsePomodoroProps = {
  minutes: number;
};
const usePomodoro = ({ minutes }: UsePomodoroProps) => {
  const [time, setTime] = useState<Duration>(
    dateUtil.duration(minutes, "minutes")
  );
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Format the time as mm:ss
  const formatTime = useCallback((time: Duration): string => {
    return time.format("mm:ss");
  }, []);

  // Handle Start Timer
  const handleStartTimer = useCallback(() => {
    setIsStart(true);
    setIsActive(true);
  }, []);

  // Handle resume/pause toggle
  const handleResumePause = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  // Handle adding extra minutes
  const addTime = useCallback((minutes: number) => {
    setTime((prevTime) => prevTime.add(minutes, "minute"));
  }, []);

  // Handle Reset Callback
  const handleReset = useCallback(() => {
    setIsStart(false);
    setIsActive(false);
    setTime(dateUtil.duration(minutes, "minutes"));
  }, []);

  // Timer countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && time.asSeconds() > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime.subtract(1, "second"));
      }, 1000);
    } else if (time.asSeconds() <= 0) {
      clearInterval(interval! as NodeJS.Timeout);
      // Stop the timer when it reaches 0
      setIsActive(false);
      audioRef?.current?.play?.();
    }
    return () => clearInterval(interval as NodeJS.Timeout);
  }, [isActive, time, audioRef]);

  const isFinishedTimer = useMemo(() => time.asSeconds() <= 0, [time]);

  return {
    time,
    isActive,
    isStart,
    audioRef,
    isFinishedTimer,
    formatTime,
    addTime,
    handleResumePause,
    handleStartTimer,
    handleReset,
  };
};

export default usePomodoro;
