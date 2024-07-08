import prismaClient from "@/libs/db/prismaClient";

export async function GET() {
  try {
    const userCount = await prismaClient.user.count();
    console.log({ userCount });
    return Response.json({ success: "OK", userCount });
  } catch (e: any) {
    console.log(e?.message);
    return Response.json({ success: "Not Ok" });
  }
}
