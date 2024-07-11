import formData from "form-data";
import Mailgun from "mailgun.js";
import config from "@/config";

const mailgun = new Mailgun(formData);

const mgClient = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "dummy",
});

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
}): Promise<any> => {
  await mgClient.messages.create(config.mailgun.domain, {
    from: config.mailgun.fromAdmin,
    to: to,
    subject: subject,
    text: text,
    html: html ? html : "",
  });
};
