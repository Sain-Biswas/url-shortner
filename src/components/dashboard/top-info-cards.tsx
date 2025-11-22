"use client";

import { IconExclamationCircleFilled } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { trpcClient } from "~/integrations/trpc/client.trpc";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/shadcn/ui/card";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "~/shadcn/ui/empty";
import { Skeleton } from "~/shadcn/ui/skeleton";

export function DashboardTopInfoCards() {
  const { data, error, isLoading } = useQuery(
    trpcClient.statistics.dashboardCardData.queryOptions()
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        <Card className="@container/card">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant={"icon"}>
                <IconExclamationCircleFilled />
              </EmptyMedia>
              <EmptyTitle>Data fetch failed</EmptyTitle>
            </EmptyHeader>
          </Empty>
        </Card>
        <Card className="@container/card">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant={"icon"}>
                <IconExclamationCircleFilled />
              </EmptyMedia>
              <EmptyTitle>Data fetch failed</EmptyTitle>
            </EmptyHeader>
          </Empty>
        </Card>
        <Card className="@container/card">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant={"icon"}>
                <IconExclamationCircleFilled />
              </EmptyMedia>
              <EmptyTitle>Data fetch failed</EmptyTitle>
            </EmptyHeader>
          </Empty>
        </Card>
        <Card className="@container/card">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant={"icon"}>
                <IconExclamationCircleFilled />
              </EmptyMedia>
              <EmptyTitle>Data fetch failed</EmptyTitle>
            </EmptyHeader>
          </Empty>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Current Active Links</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.totalActiveLinks}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            This represent the links that are currently working
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Global Reach</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.totalCountry}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total countries from where your links where visited
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Clicks</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.totalClicks}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Counted across all the links created.
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}
