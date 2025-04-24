import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "CESI Zen",
  description: "A project for CESI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <div className="border-b h-15 w-full flex items-center block md:hidden">
              <SidebarTrigger size="lg" />
              <h1 className="text-center">CESIZen</h1>
            </div>
            <Toaster richColors />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
