import Button from "@/components/niwi-ui/button/button";
import { Github, Globe, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

type linkType = {
  type: "video" | "web" | "github";
  url: string;
};

const ProjectCard: React.FC<
  PropsWithChildren<{
    image: string;
    projectTitle: string;
    projectDate: string;
    skills: string[];
    links: linkType[];
  }>
> = ({ image, projectTitle, projectDate, skills, links, children }) => {
  return (
    <div className="rounded-2xl flex flex-col overflow-hidden border dark:border-[#3c3b3c] hover:shadow-lg h-full">
      <Link href="#" className="block cursor-pointer">
        <div className="mx-auto h-48 w-full object-cover object-top relative">
          <Image
            className="w-full h-full"
            src={image}
            alt={projectTitle}
            fill
            objectFit="cover"
          />
        </div>
      </Link>

      <div className="px-3 py-2">
        <h3 className="font-semibold tracking-tight mt-1 text-base">
          {projectTitle}
        </h3>

        <span className="text-xs">{projectDate}</span>

        <div className="max-w-full text-xs py-2">{children}</div>
      </div>

      <div className="mt-auto px-3 pt-2 pb-3">
        <div className="flex flex-col gap-y-[10px] mt-auto">
          <div className="flex flex-row flex-wrap gap-x-[6px]">
            {skills.map((skill) => (
              <Button
                key={skill}
                variant={"outline"}
                size={"xs"}
                type="button"
                className="!text-xs"
              >
                {skill}
              </Button>
            ))}
          </div>

          <div className="flex flex-row flex-wrap gap-x-[6px]">
            {links.map((link) => (
              <Button
                key={link.url}
                variant={"niwi"}
                size={"xs"}
                type="button"
                className="!text-xs flex flex-row"
                prefixIcon={
                  link.type === "github" ? (
                    <Github size={14} className="inline-block mr-1" />
                  ) : link.type === "video" ? (
                    <Youtube size={14} className="inline-block mr-1" />
                  ) : (
                    <Globe size={14} className="inline-block mr-1" />
                  )
                }
              >
                {link.type === "github" ? (
                  <>
                    {/* <Github /> */}
                    Source
                  </>
                ) : link.type === "video" ? (
                  <>
                    {/* <Youtube /> */}
                    Watch
                  </>
                ) : (
                  <>
                    {/* <Globe />  */}
                    Website
                  </>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
