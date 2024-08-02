"use client";

import { cn } from "@/libs/utils";
import useAppStore from "@/stores/app/app.store";
import { Github } from "lucide-react";
import { useCallback } from "react";
import GitHubCalendar, { Activity, ThemeInput } from "react-github-calendar";
import { LinkCardType } from "../config/niwi-profile-config";

type NiwiProfileLinkItemProps = {
  item: LinkCardType;
};

const explicitTheme: ThemeInput = {
  light: ["#ebebeb", "#b4bbff", "#8690f1", "#6d7af7", "#495bff"],
  dark: ["#474747", "#b4bbff", "#8690f1", "#6d7af7", "#495bff"],
};

export default function NiwiProfileGithubCard({
  item,
}: NiwiProfileLinkItemProps) {
  const [theme] = useAppStore((store) => [store.theme]);

  // Github
  const regex = /https:\/\/github\.com\/([\w-]+)/;
  const gitMatch = regex.exec(item.link);
  const gitUserName = gitMatch?.[1];

  const selectLastHalfYear = useCallback(
    (contributions: Activity[]) => {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const shownMonths =
        item.size === "full" ? 6 : item.size === "sixty" ? 3 : 2;

      return contributions.filter((activity: Activity) => {
        const date = new Date(activity.date);
        const monthOfDay = date.getMonth();

        return (
          date.getFullYear() === currentYear &&
          monthOfDay > currentMonth - shownMonths &&
          monthOfDay <= currentMonth
        );
      });
    },
    [item.size]
  );

  return (
    <div className="w-full h-full flex flex-1 flex-row items-center gap-x-[10px]">
      <div className={item.size === "square" ? "w-full" : "min-w-[158px]"}>
        <Github size={24} className="block mx-auto my-1" />
        <h2 className="text-xs text-center">{item.title}</h2>
      </div>
      <div
        className={cn(
          "flex-1 justify-center items-center",
          item.size === "square" ? "hidden" : "flex"
        )}
      >
        <div className="github-overflow">
          {gitUserName && (
            <GitHubCalendar
              username={gitUserName}
              transformData={selectLastHalfYear}
              hideColorLegend
              hideMonthLabels
              hideTotalCount
              blockRadius={10}
              blockSize={10}
              colorScheme={theme}
              theme={explicitTheme}
            />
          )}
        </div>
      </div>
    </div>
  );
}
