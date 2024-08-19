import config from "@/config";

export const getSeoTag = ({
  title,
  description,
  image,
  canonical,
}: {
  title: string;
  description: string;
  image?: string | null;
  canonical?: string;
}) => {
  const imageList = [
    {
      url: image ?? config.meta.defaultMetaImage,
      width: 800,
      height: 600,
      alt: title,
    },
    {
      url: image ?? config.meta.defaultMetaImage,
      width: 1800,
      height: 1600,
      alt: title,
    },
  ];

  return {
    title: `${title} ${config.meta.defaultSuffix ? `| ${config.meta.defaultSuffix}` : ""}`,
    description: description,
    openGraph: {
      title,
      description,
      images: imageList,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title,
      description,
      images: imageList,
    },
    alternates: {
      ...(canonical ? { canonical } : {}),
    },
  } as const;
};
