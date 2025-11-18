import { redirect } from "next/navigation";
import { trpcServer } from "~/integrations/trpc/server.trpc";
import { AppSidebar } from "~/shadcn/app-sidebar";
import { SidebarInset, SidebarProvider } from "~/shadcn/ui/sidebar";

export default async function Page({ children }: LayoutProps<"/">) {
  const { isAuthenticated } = await trpcServer.index.isAuthenticated();

  if (!isAuthenticated) redirect("/signin");

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)"
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
