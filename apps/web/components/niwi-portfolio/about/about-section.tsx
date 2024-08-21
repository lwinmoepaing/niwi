import portfolioConfig from "@/portfolio.config";

const { about } = portfolioConfig;

const AboutSection = () => {
  return (
    <section className="w-full max-w-[720px] mx-auto mt-10">
      <section id="about">
        <div>
          <h2 className="text-xl font-bold">{about.title}</h2>
        </div>
        <div>
          <div className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            <p>{about.message}</p>
          </div>
        </div>
      </section>
    </section>
  );
};
export default AboutSection;
