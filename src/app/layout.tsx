import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { Toaster } from "sonner";
import { UserProvider } from "@/context/UserContext";

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
        <UserProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
              <Toaster richColors />
              {children}
            </main>
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
