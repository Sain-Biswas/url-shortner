"use client";

import {
  IconExclamationCircleFilled,
  IconLinkMinus,
  IconPointFilled,
  IconSearch,
  IconWorldWww
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { trpcClient } from "~/integrations/trpc/client.trpc";
import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/shadcn/ui/avatar";
import { Badge } from "~/shadcn/ui/badge";
import { Empty, EmptyHeader, EmptyMedia } from "~/shadcn/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "~/shadcn/ui/input-group";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle
} from "~/shadcn/ui/item";
import { ScrollArea } from "~/shadcn/ui/scroll-area";
import { Spinner } from "~/shadcn/ui/spinner";

export function LinkFilter() {
  const { isLoading: isTagLoading, error: tagError } = useQuery(
    trpcClient.links.getUserTags.queryOptions()
  );
  const {
    data: links,
    isLoading: isLinkLoading,
    error: linkError
  } = useQuery(trpcClient.links.getUSerLinks.queryOptions());

  const [search, setSearch] = useState<string>("");

  if (isLinkLoading && isTagLoading) {
    return (
      <section>
        <Spinner />
      </section>
    );
  }

  if (tagError && linkError) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant={"icon"}>
            <IconExclamationCircleFilled />
          </EmptyMedia>
        </EmptyHeader>
      </Empty>
    );
  }

  if (links === undefined || links.length === 0) {
    return (
      <div>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant={"icon"}>
              <IconLinkMinus />
            </EmptyMedia>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <>
      <section
        id="filters"
        className="flex flex-wrap gap-2"
      >
        <InputGroup>
          <InputGroupInput
            placeholder="Search..."
            value={search}
            onChange={event => {
              event.preventDefault();
              setSearch(event.target.value);
            }}
          />
          <InputGroupAddon>
            <IconSearch />
          </InputGroupAddon>
        </InputGroup>
      </section>

      <section
        id="link-list"
        className="flex flex-1 pt-6"
      >
        <ScrollArea className="flex-1 rounded-lg border-2 border-dotted">
          <ItemGroup>
            {links.map((link, index) => {
              const parsed = new URL(link.originalUrl);

              return (
                <Fragment key={link.id}>
                  <Item>
                    <ItemHeader>
                      <Item>
                        <ItemMedia variant={"icon"}>
                          <Avatar className="bg-transparent">
                            <AvatarImage
                              src={`https://www.google.com/s2/favicons?sz=64&domain=${parsed.hostname}`}
                            />
                            <AvatarFallback>
                              <IconWorldWww />
                            </AvatarFallback>
                          </Avatar>
                        </ItemMedia>
                        <ItemTitle>
                          https://zipinl.vercel.app/r/{link.id}
                        </ItemTitle>
                        <ItemDescription>{link.originalUrl}</ItemDescription>
                      </Item>
                    </ItemHeader>
                    <ItemContent>{link.description}</ItemContent>
                    <ItemFooter>
                      <Badge variant={"outline"}>
                        <IconPointFilled
                          className={cn(
                            link.isActive ? "text-primary" : "text-destructive"
                          )}
                        />
                        {link.clicks} Clicks
                      </Badge>
                    </ItemFooter>
                  </Item>
                  {index !== links.length - 1 && <ItemSeparator />}
                </Fragment>
              );
            })}
          </ItemGroup>
        </ScrollArea>
      </section>
    </>
  );
}
