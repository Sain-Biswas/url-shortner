"use client";

import {
  IconDeviceDesktopFilled,
  IconMoonFilled,
  IconSunHighFilled
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import {
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "~/shadcn/ui/dropdown-menu";

export function ModeToggleDropdown() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <IconSunHighFilled className="dark:hidden" />
        <IconMoonFilled className="hidden dark:block" />
        <span>Theme</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
          }}
        >
          Light
          <DropdownMenuShortcut>
            <IconSunHighFilled />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("dark");
          }}
        >
          Dark
          <DropdownMenuShortcut>
            <IconMoonFilled />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("system");
          }}
        >
          System
          <DropdownMenuShortcut>
            <IconDeviceDesktopFilled />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
