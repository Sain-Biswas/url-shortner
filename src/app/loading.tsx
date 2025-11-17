import { IconCirclesRelation } from "@tabler/icons-react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle
} from "~/shadcn/ui/item";
import { Spinner } from "~/shadcn/ui/spinner";

export default function RootLoading() {
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
        <section
          id="pending"
          className="flex flex-col items-center justify-center gap-4"
        >
          <Spinner />
          <p>Fetching User Status</p>
        </section>
      </div>
    </main>
  );
}
