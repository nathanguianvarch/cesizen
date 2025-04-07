"use client";

import { useEffect, useState } from "react";
import { DataTableDemo, User, columns } from "@/components/DataTableDemo"; // import des composants et types
import { supabase } from "@/lib/supabase";

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.auth.admin.listUsers();

      if (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error.message
        );
      } else {
        const formattedUsers = data.users.map((u) => ({
          id: u.id,
          email: u.email ?? "No email",
          created_at: u.created_at,
        }));
        setUsers(formattedUsers);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Chargement des utilisateurs...</div>;

  return (
    <div className="flex justify-center items-center">
      <DataTableDemo data={users} columns={columns} />
    </div>
  );
}
