import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../libs/hash/hash";
const prisma = new PrismaClient();

type UserType = {
  id: string;
  name: string;
  shortLink: string;
  email: string;
  password: string;
  image: string;
  role: "ADMIN" | "USER";
};

const users: UserType[] = [
  {
    id: "66bf15d243f53b96d9a81376",
    name: "Niwi-Admin",
    shortLink: "niwi.admin",
    role: "ADMIN",
    email: "admin@gmail.com",
    password: "123456",
    image: "/images/auth/admin-profile.png",
  },
  {
    id: "66bf15d243f53b96d9a81378",
    name: "Niwi-User",
    shortLink: "niwi.user",
    role: "USER",
    email: "user@gmail.com",
    password: "123456",
    image: "/images/auth/profile.jpg",
  },
  {
    id: "66bf1679cdb585f664452fd5",
    name: "Lwin Moe Paing",
    shortLink: "lwin.im",
    role: "USER",
    email: "lwinmoepaing.dev@gmail.com",
    password: "123456",
    image: "/images/auth/lwin-moe-paing.jpeg",
  },
] as const;

export default async function executeSeeding() {
  await prisma.$connect();
  console.log("User Seeder is Starting....");

  for (const user of users) {
    try {
      const profile = await prisma.userProfile.create({
        data: {
          backgroundImage: "/images/niwi-blog.png",
          aboutMe:
            '<p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">My About is Niwi !!</span></p>',
          aboutMeJson:
            '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"My About is Niwi !!","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
          statusMessage:
            '<p class="editor-paragraph" dir="ltr"><span class="emoji-img:blog.gif" style="white-space: pre-wrap;"><span class="niwi-editor-emoji" style="background-image: url(&quot;/images/emojis/blog.gif&quot;);"> </span></span><span style="white-space: pre-wrap;"> This is my Thinking </span></p><p class="editor-paragraph" dir="ltr"><span class="emoji-img:cat_scratch.gif" style="white-space: pre-wrap;"><span class="niwi-editor-emoji" style="background-image: url(&quot;/images/emojis/cat_scratch.gif&quot;);"> </span></span><span style="white-space: pre-wrap;"> Zzz... </span><span class="emoji-img:pink_ribbon.gif" style="white-space: pre-wrap;"><span class="niwi-editor-emoji" style="background-image: url(&quot;/images/emojis/pink_ribbon.gif&quot;);"> </span></span></p>',
          statusMessageJson:
            '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"token","style":"","text":" ","type":"emoji","version":1,"className":"emoji-img:blog.gif"},{"detail":0,"format":0,"mode":"normal","style":"","text":" This is my Thinking ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0},{"children":[{"detail":0,"format":0,"mode":"token","style":"","text":" ","type":"emoji","version":1,"className":"emoji-img:cat_scratch.gif"},{"detail":0,"format":0,"mode":"normal","style":"","text":" Zzz... ","type":"text","version":1},{"detail":0,"format":0,"mode":"token","style":"","text":" ","type":"emoji","version":1,"className":"emoji-img:pink_ribbon.gif"}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
          showStatusMessage: true,
          gridProfile: [
            {
              id: "MPPAIy9ima_jF3URa-vX5",
              type: "github",
              image: "",
              link: "https://github.com/lwinmoepaing",
              size: "full",
              title: "Lwin Moe Paing",
            },
            {
              id: "16uD2okRBlCypwBjH0Dsg",
              type: "facebook",
              image: "",
              link: "https://www.facebook.com/lwin.im",
              size: "square",
              title: "Facebook",
            },
            {
              id: "WpUMb6B6xeQx9SmDXNAD4",
              type: "spotify",
              image: "",
              link: "https://open.spotify.com/user/31kyur6qv3ornwaaogjurolrhsqa",
              size: "sixty",
              title: "Spotify",
            },
            {
              id: "FpBo6bSiIKHlC8CY5TGgI",
              type: "twitter",
              image: "",
              link: "https://x.com/LwinMoePaingDev",
              size: "full",
              title: "Twitter",
            },
          ],
        },
      });

      if (profile) {
        const { hash, salt } = hashPassword(user.password);
        const updateData = {
          ...user,
          password: hash,
          salt,
          userProfileId: profile.id,
        };
        await prisma.user.create({
          data: updateData,
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }

  console.log("User Seeder has finished....");
}
