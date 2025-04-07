"use client";
import LoginDialog from "@/components/LoginDialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");

  const signin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "nathanguianvarch@gmail.com",
      password: "Nathan240904",
    });
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.email) {
      setUsername(user.email);
    }
  };
  return (
    <div>
      <Button onClick={signin}>connect</Button>
      <p>{username}</p>
    </div>
  );
}
