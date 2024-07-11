const config = {
  appName: "Niwi Starter",
  domainUrl: "http://localhost:3000",
  domainName: "niwistarter.com",
  defaultUserImage: "/images/auth/profile.png",
  authRoute: {
    loginUrl: "/auth/login",
    callback: "/dashboard",
  },
  mailgun: {
    domain: process.env.EMAIL_DOMAIN_NAME || "",
    subdomain: "msg",
    fromNoReply: `Niwi <niwi@${process.env.EMAIL_DOMAIN_NAME}>`,
    fromAdmin: `Admin at Niwi <niwi@${process.env.EMAIL_DOMAIN_NAME}>`,
    supportEmail: `niwi@${process.env.EMAIL_DOMAIN_NAME}`,
  },
  minorFeatures: ["auth", "blog"],
  seeders: ["user", "blog"],
};

export default config;

export type ConfigType = typeof config;
