import Button from "@/components/niwi-ui/button/button";
import portfolioConfig, { ContactLinkType } from "@/portfolio.config";
import {
  FacebookIcon,
  Globe,
  InstagramIcon,
  Mail,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";

const { title, message, links } = portfolioConfig.contact;

const ContactLink = ({ data }: { data: ContactLinkType }) => {
  return (
    <Link href={`${data.type === "mail" ? "mailto:" : ""}${data.url}`}>
      <Button
        prefixIcon={
          data.type === "facebook" ? (
            <FacebookIcon size={14} className="inline-block mr-1" />
          ) : data.type === "twitter" ? (
            <TwitterIcon size={14} className="inline-block mr-1" />
          ) : data.type === "mail" ? (
            <Mail size={14} className="inline-block mr-1" />
          ) : data.type === "instagram" ? (
            <InstagramIcon size={14} className="inline-block mr-1" />
          ) : (
            <Globe size={14} className="inline-block mr-1" />
          )
        }
        variant={"niwi"}
        size={"sm"}
        className="text-xs"
      >
        {data.name}
      </Button>
    </Link>
  );
};

const ContactSection = () => {
  return (
    <section className="w-full max-w-[720px] mx-auto mt-16">
      <section id="contact">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-3 niwi-logo-text">{title}</h2>
          <p className="max-w-[380px] mx-auto mb-2">{message}</p>
          <div className="flex justify-center items-center gap-2">
            {links.map((item) => (
              <ContactLink key={`${item.type}_${item.name}`} data={item} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};
export default ContactSection;
