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

const lockImageUrl =
  "https://raw.githubusercontent.com/lwinmoepaing/niwi/main/assets/niwi-lock.gif";

interface MagicLinkMailProps {
  userName?: string;
  magicLink?: string;
}

export const MagicLinkMail = ({ userName, magicLink }: MagicLinkMailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Niwi Magic Link</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={logoUrl} width="140" height="76" alt="Niwi" />
          <Section>
            <Text style={text}>Hi {userName}, 🚀</Text>

            <Text style={text}>Somhow Magic will show you ✨</Text>

            <Button style={button} href={magicLink}>
              Login with Link
            </Button>

            <Text style={{ ...text, lineHeight: "20px" }}>
              <Img
                src={lockImageUrl}
                style={lockImageStyle}
                width={20}
                height={20}
              />{" "}
              Happy Using Niwi{" "}
              <Img
                src={lockImageUrl}
                style={lockImageStyle}
                width={20}
                height={20}
              />
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default MagicLinkMail;

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
  padding: "14px 7px",
  width: "100%",
};

const lockImageStyle = {
  display: "inline-block",
};
