import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const logoUrl =
  "https://raw.githubusercontent.com/lwinmoepaing/niwi/main/assets/niwi-starter.gif";

interface ResetPasswordMailProps {
  userName?: string;
  resetPasswordLink?: string;
}

export const ResetPasswordMail = ({
  userName,
  resetPasswordLink,
}: ResetPasswordMailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Niwi reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={logoUrl} width="140" height="76" alt="Niwi" />
          <Section>
            <Text style={text}>Hi {userName},</Text>
            <Text style={text}>
              Someone recently requested a password change for your account. If
              this was you, you can set a new password here:
            </Text>
            <Button style={button} href={resetPasswordLink}>
              Reset password
            </Button>

            <Text style={text}>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text style={text}>Happy Using Niwi, Thank you!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ResetPasswordMail;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};
