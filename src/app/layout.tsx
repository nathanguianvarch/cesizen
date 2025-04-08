import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
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
          <main>
            <SidebarTrigger />
            <Toaster richColors />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
