import ProjectCard from "./project-card";

const ProjectSection = () => {
  return (
    <section id="projects" className="w-full max-w-[720px] mx-auto my-10">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-3 niwi-logo-text">Projects</h2>
        <p className="max-w-[380px] mx-auto mb-5">
          Take a peek at what I've been up to! Here are some of my personal
          favorites
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ProjectCard
          image={""}
          projectTitle={"Niwi Starter"}
          projectDate={"July 2024 - Present"}
          skills={["Hehe.js"]}
          links={[{ type: "video", url: "https://lwinmoepaing.com" }]}
        >
          <p>Hello</p>
        </ProjectCard>
        <ProjectCard
          image={"/images/portfolio/lwin-store.gif"}
          projectTitle={"Lwin Store"}
          projectDate={"July 2024 - Present"}
          skills={[
            "React Three Fiber",
            "React.js",
            "Vite",
            "Typescript",
          ]}
          links={[{ type: "video", url: "https://lwinmoepaing.com" }]}
        >
          <p>My Learning ThreeJS Progress . It tiny project but enjoy it .</p>
        </ProjectCard>
        <ProjectCard
          image={"/images/portfolio/mmswe.gif"}
          projectTitle={"Myanmar Software Engineer"}
          projectDate={"July 2024 - Present"}
          skills={[
            "React.js",
            "Framer",
            "MDX",
            "Typescript",
          ]}
          links={[{ type: "video", url: "https://lwinmoepaing.com" }]}
        >
          <p>
            This platform welcomes all software engineers in Myanmar. Whether
            you are into desktop, web, mobile, or cloud engineering, this is
            your space to connect, learn, and share for all software engineers.
          </p>
        </ProjectCard>
        <ProjectCard
          image={"/images/portfolio/invoice.gif"}
          projectTitle={"Invoice Maker"}
          projectDate={"July 2024 - Present"}
          skills={["React.js", "Tailwind", "LottieFiles"]}
          links={[{ type: "video", url: "https://lwinmoepaing.com" }]}
        >
          <p>Simple Invoice-Maker with Only React.Js</p>
        </ProjectCard>
      </div>
    </section>
  );
};

export default ProjectSection;
