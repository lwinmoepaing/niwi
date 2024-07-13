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

        {!session ? (
          <>
            <Link href="/auth/login">
              <Button>Login</Button>
            </Link>
          </>
        ) : (
          <>
            <div className="flex flex-row gap-x-[16px] justify-center">
              {/* <Link href="/dashboard">
                <Button variant={"outline"}>Dashboard</Button>
              </Link> */}
              <SignOutButton />
            </div>
            <div className="text-left text-sm dark:text-white ">
              <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
