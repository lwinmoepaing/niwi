import Button from "@/components/niwi-ui/button/button";
import { auth } from "@/libs/auth/next-auth";
import Link from "next/link";
import SignOutButton from "./(feat)/auth/assets/components/SignOutButton";

export default async function HomePage() {
  const session = await auth();

  return (
    <main className={"h-screen font-bold"}>
      <section className="w-full max-w-[800px] mx-auto py-20 text-center">
        <div className="text-center mb-5">
          <h1 className="text-8xl bg-gradient-to-r inline-block  from-rose-500 via-purple-700 to-blue-400 text-transparent bg-clip-text">
            Niwi Starter
          </h1>
        </div>

        <Link href="/auth/login">
          <Button>Login</Button>
        </Link>

        <div className="text-left text-sm">
          {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
        </div>
        {session && <SignOutButton />}
      </section>
    </main>
  );
}
