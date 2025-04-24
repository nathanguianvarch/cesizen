"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { auth, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!auth || auth.profile.role !== 1) {
        router.push("/");
      }
    }
  }, [auth, loading, router]);

  return <div>{children}</div>;
}
