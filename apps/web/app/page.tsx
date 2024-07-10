import Button from "@/components/niwi-ui/button/button";
import { auth } from "@/libs/auth/next-auth";
import Link from "next/link";
import SignOutButton from "./(feat)/auth/assets/components/SignOutButton";

export default async function HomePage() {
  const session = await auth();

  return (
    <main className={"h-screen font-bold"}>
      <section className="container mx-auto">
        <h1>This is Niwi Starter</h1>
        <Link href="/auth/login">
          <Button>Login</Button>
        </Link>
        {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
        {session && <SignOutButton />}
      </section>
    </main>
  );
}
