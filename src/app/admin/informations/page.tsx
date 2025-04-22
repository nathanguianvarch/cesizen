"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Database } from "../../../../database.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Clipboard, MoreHorizontal, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchInformations } from "@/tools/information";

export default function ManageInformations() {
  const [informations, setInformations] = useState<
    Database["public"]["Tables"]["information"]["Row"][]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchInformations();
      setInformations(data);
      console.log(data);
    };
    fetchData();
  }, []);

  // const handleDeleteUser = async (id: string) => {
  //   await deleteUserById(id);
  //   const data = await fetchAllUsers();
  //   setInformations(data);
  // };

  const columns: ColumnDef<
    Database["public"]["Tables"]["information"]["Row"]
  >[] = [
    {
      accessorKey: "created_at",
      header: "Créer le",
    },
    {
      accessorKey: "title",
      header: "Titre",
    },
    {
      accessorKey: "content",
      header: "Contenu",
    },
    {
      accessorKey: "image",
      header: "Lien de l'image",
    },
    {
      accessorKey: "category",
      header: "Catégorie",
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
                onClick={() =>
                  navigator.clipboard.writeText(user.id.toString())
                }
              >
                <Clipboard />
                Copier l'ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                variant="destructive"
                // onClick={() => handleDeleteUser(user.user.id)}
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
    data: informations ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="m-4 flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
        Gestion des informations
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
