import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
