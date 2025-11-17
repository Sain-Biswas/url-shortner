"use client";

import {
  IconCreditCard,
  IconDotsVertical,
  IconExclamationCircleFilled,
  IconLogout,
  IconNotification,
  IconRefresh,
  IconUserCircle
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { ModeToggleDropdown } from "~/integrations/next-themes/mode-toggle-dropdown";
import { trpcClient } from "~/integrations/trpc/client.trpc";

import { useRouter } from "next/navigation";
import { authClient } from "~/server/authentication/client.auth";
import { Avatar, AvatarFallback, AvatarImage } from "~/shadcn/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/shadcn/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "~/shadcn/ui/sidebar";
import { Button } from "./ui/button";
import { ItemMedia } from "./ui/item";
import { Skeleton } from "./ui/skeleton";
import { Spinner } from "./ui/spinner";

export function NavUser() {
  const {
    data: user,
    isPending,
    error
  } = useQuery(trpcClient.authentication.getCurrentUser.queryOptions());

  const { isMobile } = useSidebar();

  const router = useRouter();

  if (isPending) {
    return (
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <Skeleton className="size-8" />
        <div className="flex flex-1 flex-col gap-2 text-left text-sm leading-tight">
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-full" />
        </div>
        <Spinner className="ml-auto size-4" />
      </SidebarMenuButton>
    );
  }

  if (error) {
    return (
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <ItemMedia className="size-8">
          <IconExclamationCircleFilled />
        </ItemMedia>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">User fetch error</span>
          <span className="truncate text-xs text-muted-foreground">
            Please refresh page
          </span>
        </div>
        <Button
          variant={"ghost"}
          onClick={() => {
            router.refresh();
          }}
        >
          <IconRefresh />
        </Button>
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg bg-primary text-primary-foreground">
                <AvatarImage
                  src={user.image ?? undefined}
                  alt={user.name}
                />
                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg bg-secondary text-secondary-foreground">
                  <AvatarImage
                    src={user.image ?? undefined}
                    alt={user.name}
                  />
                  <AvatarFallback className="rounded-lg bg-secondary text-secondary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
              <ModeToggleDropdown />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={async event => {
                event.preventDefault();
                await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.replace("/signin");
                    }
                  }
                });
              }}
            >
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
