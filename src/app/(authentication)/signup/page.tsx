import Link from "next/link";
import { Button } from "~/shadcn/ui/button";
import { SignupForm } from "./signup-form";

export default function SignupPage() {
  return (
    <section id="form">
      <SignupForm />
      <p className="text-center text-sm text-accent-foreground">
        Already have an account?
        <Button
          variant={"link"}
          asChild
        >
          <Link href="/signin">Signin</Link>
        </Button>
      </p>
    </section>
  );
}
