import Button from "@/components/niwi-ui/button/button";

const skills = [
  "Next.js",
  "React.js",
  "Javascript",
  "Typescript",
  "React Native",
  "Solid.js",
  "Vue.js",
  "Node",
  "Express",
  "MongoDB",
  "Prisma",
  "Zod",
  "React Hook Form",
  "React Query",
  "Superbase",
  "Storybook",
  "Redux",
  "Zustand",
  "AJAX",
  "Axios",
  "CSS",
  "SASS",
  "SCSS",
];

function SkillsSection() {
  return (
    <section id="skills" className="w-full max-w-[720px] mx-auto my-10">
      <div>
        <h2 className="text-xl font-bold mb-3">Skills</h2>
      </div>
      <div className="flex flex-row flex-wrap gap-x-[6px] gap-y-[6px]">
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
    </section>
  );
}
export default SkillsSection;
