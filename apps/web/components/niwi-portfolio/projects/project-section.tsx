import portfolioConfig from "@/portfolio.config";
import ProjectCard from "./project-card";

const { title, message, data } = portfolioConfig.project;

const ProjectSection = () => {
  return (
    <section id="projects" className="w-full max-w-[720px] mx-auto my-10">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-3 niwi-logo-text">{title}</h2>
        <p className="max-w-[380px] mx-auto mb-5">{message}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((project) => (
          <ProjectCard
            key={project.projectTitle}
            image={project.image}
            projectTitle={project.projectTitle}
            projectDate={project.projectDate}
            skills={project.skills}
            links={project.links}
          >
            <p>{project.description}</p>
          </ProjectCard>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
