import { type Metadata } from "next";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/sidebar/app-sidebar";
import { Separator } from "~/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import BreadcrumbPageClient from "~/components/sidebar/breadcrumb-page-client";
import SoundBar from "~/components/sound-bar";

export const metadata: Metadata = {
  title: "Home",
  description: "Music Generator",
};

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex h-screen flex-col">
        <header className="border-border/50 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 border-b backdrop-blur">
          <div className="flex h-16 shrink-0 grow items-center gap-3 px-6">
            <SidebarTrigger className="border-border/50 bg-background hover:bg-accent/50 -ml-1 h-9 w-9 rounded-lg border transition-colors duration-200" />
            <Separator
              orientation="vertical"
              className="mr-2 h-6 data-[orientation=vertical]:h-6"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPageClient />
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="bg-background flex-1 overflow-y-auto">{children}</main>
        <SoundBar />
      </SidebarInset>
    </SidebarProvider>
  );
}
