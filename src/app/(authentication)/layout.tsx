import { IconCirclesRelation } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import { trpcServer } from "~/integrations/trpc/server.trpc";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle
} from "~/shadcn/ui/item";

export default async function AuthenticationLayout({
  children
}: LayoutProps<"/">) {
  const { isAuthenticated } = await trpcServer.index.isAuthenticated();

  if (isAuthenticated) redirect("/dashboard");

  return (
    <main className="grid min-h-screen place-content-center">
      <div>
        <section id="organization">
          <Item>
            <ItemHeader>
              <ItemMedia
                variant={"icon"}
                className="m-auto size-10"
              >
                <IconCirclesRelation className="size-6" />
              </ItemMedia>
            </ItemHeader>
            <ItemContent className="items-center">
              <ItemTitle className="text-2xl font-extrabold">
                URL Shortener
              </ItemTitle>
              <ItemDescription className="text-center">
                An easy to use URL Shortener for everyday use.
              </ItemDescription>
            </ItemContent>
          </Item>
        </section>
        {children}
      </div>
    </main>
  );
}
