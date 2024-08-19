import AboutSection from "@/components/niwi-portfolio/about/about-section";
import ContactSection from "@/components/niwi-portfolio/contact/contact";
import EducationHistory from "@/components/niwi-portfolio/education-history/education-history";
import HeroSection from "@/components/niwi-portfolio/hero/hero-section";
import ProjectSection from "@/components/niwi-portfolio/projects/project-section";
import SkillsSection from "@/components/niwi-portfolio/skills/skills-section";
import WorkHistory from "@/components/niwi-portfolio/work-history/work-history";
import Footer from "@/components/niwi-ui/footer/footer";
import {
  checkAvailableBlogs,
  getLast3Blogs,
} from "@/feats/blog/services/blog.service";
import { auth } from "@/libs/auth/next-auth";
import { getSeoTag } from "@/libs/seo/seo";
import { PublishedBlog } from "@/types/blog-response";

export const metadata = getSeoTag({
  title: "Lwin Moe Paing",
  description:
    "Senior Frontend Engineer. I love building things and helping people. Very active on Facebook and also Twitter 🎉",
});

export default async function HomePage() {
  const session = await auth();

  const isAvailableBlogs = checkAvailableBlogs();
  let blogs: PublishedBlog[] = [];
  if (isAvailableBlogs) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    blogs = await getLast3Blogs(session?.user?.id);
  }

  return (
    <main className={"h-screen overflow-x-hidden px-[20px] md:px-0"}>
      <HeroSection />

      <AboutSection />

      <SkillsSection />

      <WorkHistory />

      <EducationHistory />

      <ProjectSection />

      {/*--------------------------------
       * Blog Sections
       *--------------------------------
       * First you need to connect mongo database.
       * Please update DB_URL in ".env" file and "npm run seed".
       *
       * import Blog from "@/components/niwi-portfolio/blog/blog";
       * <Blog isAvailableBlogs={isAvailableBlogs} blogs={blogs} />
       */}

      <ContactSection />

      <Footer />
    </main>
  );
}
