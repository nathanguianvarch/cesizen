"use client";
import { fetchCurrentUser } from "@/tools/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const verifyIsAdmin = async () => {
      const user = await fetchCurrentUser();
      if (user?.profile.role != 1) {
        router.push("/");
      }
    };
    verifyIsAdmin();
  }, [router]);

  return <div>{children}</div>;
}
