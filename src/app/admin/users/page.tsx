"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { fetchAllUsers } from "@/tools/user";
import { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Database } from "../../../../database.types";
import { User } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Clipboard, MoreHorizontal, Power, Trash2 } from "lucide-react";
import {
  ActivateUserById,
  deleteUserById,
  disableUserById,
} from "@/tools/admin";
import { Checkbox } from "@/components/ui/checkbox";

export default function ManageUsers() {
  const [users, setUsers] = useState<
    {
      user: User;
      profile: Database["public"]["Tables"]["profile"]["Row"];
    }[]
  >([]);
  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchAllUsers();
      setUsers(data);
      console.log(data);
    };
    getUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    await deleteUserById(id);
    const data = await fetchAllUsers();
    setUsers(data);
  };

  const handleDisableUser = async (id: string) => {
    await disableUserById(id);
    const data = await fetchAllUsers();
    setUsers(data);
  };
  const handleActivateUser = async (id: string) => {
    await ActivateUserById(id);
    const data = await fetchAllUsers();
    setUsers(data);
  };

  const columns: ColumnDef<{
    user: User;
    profile: Database["public"]["Tables"]["profile"]["Row"];
  }>[] = [
    {
      accessorKey: "profile.active",
      header: "Compte Actif",
      cell: ({ row }) => {
        return <Checkbox checked={row.original.profile.active} />;
      },
    },
    {
      accessorKey: "user.email",
      header: "Email",
    },
    {
      accessorKey: "profile.firstname",
      header: "Prénom",
    },
    {
      accessorKey: "profile.lastname",
      header: "Nom",
    },
    {
      accessorKey: "profile.role.name",
      header: "Role",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.user.id)}
              >
                <Clipboard />
                Copier l&apos;ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {user.profile.active ? (
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => handleDisableUser(user.user.id)}
                >
                  <Power />
                  Désactiver
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => handleActivateUser(user.user.id)}
                >
                  <Power />
                  Activer
                </DropdownMenuItem>
              )}

              <DropdownMenuItem
                variant="destructive"
                onClick={() => handleDeleteUser(user.user.id)}
              >
                <Trash2 />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: users ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="m-4 flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
        Gestion des utilisateurs
      </h1>
      <div className="border rounded-xl p-2">
        <Table>
          <TableHeader>
            <TableRow>
              {table.getHeaderGroups()[0].headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
