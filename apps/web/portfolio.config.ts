const heroConfig = {
  welcomeMessage: "Hi, I'm Lwin Moe Paing",
  image: "/images/auth/lwin-moe-paing.jpeg",
  message:
    "Senior Frontend Engineer passionate about building and helping others.",
  linkPrefix: "Catch me active on",
  linkSuffix: "🎉",
  links: [
    { name: "Twitter", link: "https://x.com/LwinMoePaingDev" },
    { name: "Facebook", link: "https://facebook.com/lwin.im" },
  ],
};

const aboutConfig = {
  title: "About",
  message:
    "6years+ Experience and Currently working the frontend technology project at Croucher Foundation in Hong Kong. Possessing extensive banking knowledge in mobile development, gained through experience as a mobile developer at uab Bank in Myanmar. I am also the author of the ebook titled ‘HTML & CSS - Beginner to Super Beginner,’ showcasing my expertise and commitment to educating beginners in web development.",
};

const skillsConfig = [
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

const workHistoryConfig = {
  title: "Work History",
  workList: [
    {
      companyName: "Binary Lab",
      companyImage: "/images/portfolio/binarylab.png",
      timeline: "Jul 2023 - Present",
      role: "Senior NextJs, React Developer",
      description:
        "Currently, I’m working on a project for the Croucher Foundation based in HongKong. I’m updating their old WordPress site to Next.js, incorporating CMS editor tools for a more modern and efficient user experience. For more information about the Croucher Foundation",
    },
    {
      companyName: "Mo.com.mm",
      companyImage: "/images/portfolio/mo-money.png",
      timeline: "Jan 2023 - June 2023",
      role: "Senior React Native Developer",
      description:
        "I played a pivotal role in fostering collaboration with the Vietnam team. My focus was on articulating and fulfilling essential requirements for feature development using React Native. Working within a team proficient in core banking, I specialized in API integration and implemented crucial error logging features for app development.",
    },
    {
      companyName: "uab Bank",
      companyImage: "/images/portfolio/uabbank.jpg",
      timeline: "Jul 2021 - May 2022",
      role: "Senior React Native Developer",
      description:
        "At this time, I find it quite challenging as my background is in frontend web development. However, in my current role, I work as a mobile developer with React Native. Fortunately, the transition isn’t taking much time because ReactJS and React Native share many similarities.",
    },
    {
      companyName: "Move Move Everything",
      companyImage: "/images/portfolio/move-move.png",
      timeline: "Jan 2021 - Jun 2021",
      role: "Senior React Developer",
      description:
        "Despite the learning curve of logistics sector, I dedicated myself to the role and successfully contributed to the development of various internal dashboards.",
    },
    {
      companyName: "Marathon Myanmar",
      companyImage: "/images/portfolio/marathon-myanmar.png",
      timeline: "Jan 2020 - Dec 2020",
      role: "Mid-Level VueJs Developer",
      description:
        "My primary focus was on crafting seamless user experiences through the integration of UX/UI design with coding for the Marathon Web platform. Utilizing Nuxt.js, a Vue.js Server Side Framework, I was instrumental in developing internal portals, including an agent portal and a customer service portal.",
    },
    {
      companyName: "Fairway Technology",
      companyImage: "/images/portfolio/fairway.jpg",
      timeline: "May 2019 - Jan 2020",
      role: "Internship Program, Junior Developer",
      description:
        "I was selected as an intern and actively contributed to projects involving Vue.js and React.js during this period.I had the opportunity to work with ReactJS on the career listing page on large project, similar to a job-finding platform and it is for AyaBank.",
    },
    {
      companyName: "Spiceworks Myanmar",
      companyImage: "/images/portfolio/spiceworks-mm.jpg",
      timeline: "Mar 2018 - Nov 2018",
      role: "Part-time Frontend Developer as Student",
      description:
        "I specialized in ensuring pixel-perfect designs and client-side frontend development using HTML, CSS, and JavaScript. My responsibilities included maintaining a high standard of visual precision and collaborating with clients to achieve their desired frontend designs. One of my significant achievements was spearheading the development of the WIT 2019 landing page, where I took on the responsibility of translating creative concepts into functional and visually appealing web designs.",
    },
  ],
};

const educationHistoryConfig = {
  title: "Education History",
  educationList: [
    {
      name: "Hong Kong University",
      image: "/images/portfolio/uohk.jpg",
      timeline: "2022 - 2023",
      message: "Certified React Full Stack Developer",
    },
    {
      name: "University of Yangon",
      image: "/images/portfolio/uoy.jpg",
      timeline: "2019 - 2020",
      message: "Diploma in Web Development",
    },
    {
      name: "University of Computer Studies, Yangon",
      image: "/images/portfolio/ucsy.jpg",
      timeline: "2013 - 2015",
      message: "Completing coursework up to the third year",
    },
  ],
};

type ProjectData = {
  image: string;
  projectTitle: string;
  projectDate: string;
  skills: string[];
  links: {
    type: "github" | "web" | "video";
    url: string;
  }[];
  description: string;
};

const projectConfig = {
  title: "Projects",
  message:
    "Take a peek at what I've been up to! Here are some of my personal favorites",
  data: [
    {
      image: "/images/portfolio/niwi-starter.gif",
      projectTitle: "Niwi Starter",
      projectDate: "July 2024 - Present",
      skills: ["Next.js", "React.js", "Tailwind"],
      links: [
        { type: "github", url: "https://github.com/lwinmoepaing/niwi" },
        { type: "web", url: "https://niwi-docs.vercel.app" },
      ],
      description:
        "Niwi Starter is a comprehensive, easy-to-use template for rapidly bootstrapping a Next.js application with essential features like authentication, blog management, email integration, database pre-seeding, and more. 🎉",
    },
    {
      image: "/images/portfolio/lwin-store.gif",
      projectTitle: "Lwin Store",
      projectDate: "March 2024",
      skills: ["React Three Fiber", "React.js", "Vite", "Typescript"],
      links: [
        {
          type: "github",
          url: "https://github.com/lwinmoepaing/threejs-lwin-store",
        },
        { type: "web", url: "https://threejs-lwin-store.vercel.app" },
        {
          type: "video",
          url: "https://www.facebook.com/watch/?v=3680244405565404",
        },
      ],
      description:
        "My Learning ThreeJS Progress by learning Blender and React-Fiber. Yeah ! It's a tiny project but I really enjoy it . ",
    },
    {
      image: "/images/portfolio/mmswe.gif",
      projectTitle: "Myanmar Software Engineer",
      projectDate: "Oct 2023 - Dec 2023",
      skills: ["React.js", "Framer", "MDX", "Typescript"],
      links: [
        {
          type: "github",
          url: "https://github.com/myanmar-software-engineers/myanmar-software-engineers.github.io",
        },
        {
          type: "web",
          url: "https://myanmar-software-engineers.github.io",
        },
      ],
      description:
        "This platform welcomes all software engineers in Myanmar. Whether you are into desktop, web, mobile, or cloud engineering, this is your space to connect, learn, and share for all software engineers.",
    },
    {
      image: "/images/portfolio/invoice.gif",
      projectTitle: "Invoice Maker",
      projectDate: "May 2022",
      skills: ["React.js", "Javascript", "Tailwind", "LottieFiles"],
      links: [
        { type: "web", url: "https://invoice-maker-six.vercel.app" },
        {
          type: "github",
          url: "https://github.com/lwinmoepaing/invoice-maker",
        },
        { type: "video", url: "https://youtu.be/XoGOtx33NYM" },
      ],
      description:
        "Simple Invoice-Maker with Only React.Js.It Can Easily Pre-Manage Products, Pre-Manage Clients, Export PDF and Export Image",
    },
  ] as ProjectData[],
};

export type ContactLinkType = {
  type: "facebook" | "twitter" | "linkedin" | "mail" | "instagram" | "web";
  name: string;
  url: string;
};

const contactConfig = {
  title: "Get in Touch",
  message:
    "Feel free to drop me a message—I'm always up for a chat! Thanks so much! because I'm so socialable. Thank you!! .",
  links: [
    {
      type: "twitter",
      name: "Twitter",
      url: "https://x.com/LwinMoePaingDev",
    },
    {
      type: "facebook",
      name: "Facebook",
      url: "https://facebook.com/lwin.im",
    },
    {
      type: "mail",
      name: "Gmail",
      url: "hi@lwinmoepaing.com",
    },
  ] as ContactLinkType[],
};

export type FooterLinkType = {
  name: string;
  url: string;
};

const footerConfig = {
  footerHead: {
    icon: "/niwi-logo.svg",
    headMessage: "Build with Niwi Starter",
    message: "Welcome to my profile.",
  },
  link: {
    title: "Links",
    links: [
      {
        name: "Documentation",
        url: "https://niwi-docs.vercel.app/",
      },
      {
        name: "Twitter",
        url: "https://x.com/LwinMoePaingDev",
      },
      {
        name: "Github",
        url: "https://github.com/lwinmoepaing/",
      },
    ] as FooterLinkType[],
  },
  channel: {
    title: "Channel",
    links: [
      {
        name: "Discord",
        url: "https://discord.gg/7Vpja2RKTG",
      },
    ] as FooterLinkType[],
  },
};

const portfolioConfig = {
  name: "Lwin Moe Paing",
  hero: heroConfig,
  about: aboutConfig,
  skills: skillsConfig,
  workHistory: workHistoryConfig,
  educationHistory: educationHistoryConfig,
  project: projectConfig,
  contact: contactConfig,
  footer: footerConfig,
} as const;

export default portfolioConfig;
