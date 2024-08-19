import Button from "@/components/niwi-ui/button/button";
import { FacebookIcon, Mail, TwitterIcon } from "lucide-react";
import Link from "next/link";

const ContactSection = () => {
  return (
    <section className="w-full max-w-[720px] mx-auto mt-16">
      <section id="contact">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-3 niwi-logo-text">
            Get in Touch
          </h2>
          <p className="max-w-[380px] mx-auto mb-2">
            Feel free to drop me a message—I'm always up for a chat! Thanks so
            much! because I'm so socialable. Thank you!! .
          </p>
          <div className="flex justify-center items-center gap-2">
            <Link href="https://facebook.com/lwin.im">
              <Button
                prefixIcon={
                  <FacebookIcon size={14} className="inline-block mr-1" />
                }
                variant={"niwi"}
                size={"sm"}
                className="text-xs"
              >
                Facebook
              </Button>
            </Link>
            <Link href="https://x.com/LwinMoePaingDev">
              <Button
                prefixIcon={
                  <TwitterIcon size={14} className="inline-block mr-1" />
                }
                variant={"niwi"}
                size={"sm"}
                className="text-xs"
              >
                Twitter
              </Button>
            </Link>
            <Link href="mailto:hi@lwinmoepaing.com">
              <Button
                prefixIcon={<Mail size={14} className="inline-block mr-1" />}
                variant={"niwi"}
                size={"sm"}
                className="text-xs"
              >
                Gmail
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};
export default ContactSection;
