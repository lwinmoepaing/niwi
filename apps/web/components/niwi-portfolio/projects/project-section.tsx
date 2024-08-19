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
          image={"/images/portfolio/niwi-starter.gif"}
          projectTitle={"Niwi Starter"}
          projectDate={"July 2024 - Present"}
          skills={["Next.js", "React.js", "Tailwind"]}
          links={[
            { type: "github", url: "https://github.com/lwinmoepaing/niwi" },
            { type: "web", url: "https://niwi-docs.vercel.app" },
          ]}
        >
          <p>Hello</p>
        </ProjectCard>
        <ProjectCard
          image={"/images/portfolio/lwin-store.gif"}
          projectTitle={"Lwin Store"}
          projectDate={"July 2024 - Present"}
          skills={["React Three Fiber", "React.js", "Vite", "Typescript"]}
          links={[
            {
              type: "github",
              url: "https://github.com/lwinmoepaing/threejs-lwin-store",
            },
            { type: "web", url: "https://threejs-lwin-store.vercel.app" },
            {
              type: "video",
              url: "https://www.facebook.com/watch/?v=3680244405565404",
            },
          ]}
        >
          <p>My Learning ThreeJS Progress . It tiny project but enjoy it .</p>
        </ProjectCard>
        <ProjectCard
          image={"/images/portfolio/mmswe.gif"}
          projectTitle={"Myanmar Software Engineer"}
          projectDate={"July 2024 - Present"}
          skills={["React.js", "Framer", "MDX", "Typescript"]}
          links={[
            {
              type: "github",
              url: "https://github.com/myanmar-software-engineers/myanmar-software-engineers.github.io",
            },
            {
              type: "web",
              url: "https://myanmar-software-engineers.github.io",
            },
          ]}
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
          skills={["React.js", "Javascript", "Tailwind", "LottieFiles"]}
          links={[
            { type: "web", url: "https://invoice-maker-six.vercel.app" },
            { type: "github", url: "https://github.com/lwinmoepaing/invoice-maker" },
            { type: "video", url: "https://youtu.be/XoGOtx33NYM" }
          ]}
        >
          <p>Simple Invoice-Maker with Only React.Js</p>
        </ProjectCard>
      </div>
    </section>
  );
};

export default ProjectSection;
