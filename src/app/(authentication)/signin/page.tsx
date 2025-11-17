import Link from "next/link";
import { Button } from "~/shadcn/ui/button";
import { SigninForm } from "./signin-form";

export default function SigninPage() {
  return (
    <section id="form">
      <SigninForm />
      <p className="text-center text-sm text-accent-foreground">
        Don&apos;t have an account?
        <Button
          variant={"link"}
          asChild
        >
          <Link href="/signup">Signup</Link>
        </Button>
      </p>
    </section>
  );
}
