import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import npm2yarn from "@docusaurus/remark-plugin-npm2yarn";
import type * as Preset from "@docusaurus/preset-classic";
import tailwindPlugin from "./plugins/tailwind.config.cjs";

const config: Config = {
  title: "Niwi Starter",
  tagline: "Niwi Starter are cool",
  favicon: "img/niwi-logo.ico",

  // Set the production url of your site here
  url: "https://niwi-starter.vercel.app/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "lwinmoepaing", // Usually your GitHub org/user name.
  projectName: "niwi", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [tailwindPlugin],

  presets: [
    [
      "classic",
      {
        docs: {
          breadcrumbs: false,
          sidebarPath: "./sidebars.ts",
          remarkPlugins: [[npm2yarn, { sync: true }]],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/lwinmoepaing/niwi/tree/main/apps/docs",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/lwinmoepaing/niwi/tree/main/apps/docs",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "dark",
    },
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: "Niwi Starter Logo",
        src: "img/niwi-starter-logo.svg",
      },
      items: [
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Get started',
        // },
        // {to: '/blog-1', label: 'Blog', position: 'left'},

        {
          type: "html",
          position: "right",
          value: `<button type="button" class="niwi-nav-logo-item"><img src="/img/niwi-logo.svg"/></button>`,
          // href: 'https://github.com/lwinmoepaing/niwi',
          // label: 'GitHub',
          // icon: "/img/niwi-logo.svg"
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
