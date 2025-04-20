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

  const columns: ColumnDef<{
    user: User;
    profile: Database["public"]["Tables"]["profile"]["Row"];
  }>[] = [
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
  ];

  const table = useReactTable({
    data: users ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="m-4">
      <div className="border rounded-xl p-4">
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
