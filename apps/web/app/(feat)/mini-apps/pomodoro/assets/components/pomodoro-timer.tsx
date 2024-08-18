"use client";

import Button from "@/components/niwi-ui/button/button";
import React, { useState } from "react";
import PomodoroTimerItem from "./pomodoro-timer-item";

const PomodoroTimer: React.FC = () => {
  const [type, setType] = useState<"focus" | "long" | "short">("focus");

  return (
    <section>
      <div className="text-center">
        <div className="flex flex-row gap-x-[10px] justify-center mb-8">
          <Button variant={"niwi"} size={"sm"} onClick={() => setType("focus")}>
            Focus
          </Button>
          <Button variant={"niwi"} size={"sm"} onClick={() => setType("short")}>
            Short Break
          </Button>
          <Button variant={"niwi"} size={"sm"} onClick={() => setType("long")}>
            Long Break
          </Button>
        </div>
      </div>
      <div className="text-center">
        {type === "focus" && <PomodoroTimerItem minutes={25} show={true} />}
        {type === "short" && <PomodoroTimerItem minutes={5} show={true} />}
        {type === "long" && <PomodoroTimerItem minutes={10} show={true} />}
      </div>
    </section>
  );
};

export default PomodoroTimer;
