const config = {
  appName: "Niwi Starter",
  dbUrl: process.env.DATABASE_URL || "",
  domainUrl: "http://localhost:3000",
  domainName: "niwistarter.com",
  defaultUserImage: "/images/auth/profile.jpg",
  secretKey: process.env.SECRET_HASH_KEY || "niwi",
  meta: {
    defaultMetaImage: "/images/niwi-blog.png",
    defaultSuffix: "Niwi Starter",
  },
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
  payment: {
    showLog: true,
    stripePubKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
    basicMonthlyPaymentKey: process.env.NEXT_PUBLIC_BASIC_MONTHLY_PRICE_ID!,
    basicYearlyPaymentKey: process.env.NEXT_PUBLIC_BASIC_YEARLY_PRICE_ID!,
  },
};

export default config;

export type ConfigType = typeof config;
