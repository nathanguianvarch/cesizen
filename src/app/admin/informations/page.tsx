/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
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
import {
  deleteInformationById,
  fetchInformations,
  updateInformationById,
} from "@/tools/information";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchInformationCategories } from "@/tools/information_category";
import { AddInformationsDialog } from "@/components/AddInformationsDialog";

export default function ManageInformations() {
  const [informations, setInformations] = useState<
    Database["public"]["Tables"]["information"]["Row"][]
  >([]);
  const [informationCategories, setInformationCategories] = useState<
    Database["public"]["Tables"]["information_category"]["Row"][]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const informations = await fetchInformations();
      setInformations(informations);
      const informationCategories = await fetchInformationCategories();
      setInformationCategories(informationCategories);
    };
    fetchData();
  }, []);

  const columns: ColumnDef<
    Database["public"]["Tables"]["information"]["Row"]
  >[] = [
    {
      accessorKey: "created_at",
      header: "Créer le",
      cell: ({ row }) => {
        return (
          <>
            {format(row.original.created_at, "d MMMM yyyy 'à' HH'h'mm", {
              locale: fr,
            })}
          </>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Titre",
      cell: ({ row }) => {
        const [draft, setDraft] = useState(row.original.title!);

        const onBlur = async () => {
          if (draft != row.original.title) {
            console.log(draft);
            await updateInformationById(row.original.id, { title: draft });
          }
        };

        return (
          <Input
            value={draft}
            onBlur={onBlur}
            onChange={(e) => setDraft(e.target.value)}
            className="min-w-70"
            placeholder="Titre"
          />
        );
      },
    },
    {
      accessorKey: "content",
      header: "Contenu",
      cell: ({ row }) => {
        const [draft, setDraft] = useState(row.original.content!);

        const onBlur = async () => {
          if (draft != row.original.content) {
            await updateInformationById(row.original.id, { content: draft });
          }
        };

        return (
          <Textarea
            value={draft}
            onBlur={onBlur}
            onChange={(e) => setDraft(e.target.value)}
            className="w-100"
            placeholder="Contenu"
          />
        );
      },
    },
    {
      accessorKey: "image",
      header: "Lien de l'image",
      cell: ({ row }) => {
        const [draft, setDraft] = useState(row.original.image!);

        const onBlur = async () => {
          if (draft != row.original.image) {
            console.log(draft);
            await updateInformationById(row.original.id, { image: draft });
          }
        };

        return (
          <Input
            value={draft}
            onBlur={onBlur}
            onChange={(e) => setDraft(e.target.value)}
            className="w-48"
            placeholder="Lien image"
          />
        );
      },
    },
    {
      accessorKey: "category",
      header: "Catégorie",
      cell: ({ row }) => {
        const onRoleChange = async (roleId: string) => {
          console.log(roleId);
          await updateInformationById(row.original.id, {
            category: parseInt(roleId),
          });
        };

        return (
          <Select
            defaultValue={row.original.category?.toString()}
            onValueChange={onRoleChange}
          >
            <SelectTrigger className="w-70">
              <SelectValue placeholder="Choisissez un rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {informationCategories.map((category) => (
                  <SelectItem value={category.id.toString()} key={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
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
                Copier l&apos;ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                variant="destructive"
                onClick={async () =>
                  await deleteInformationById(row.original.id)
                }
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
      <AddInformationsDialog />
    </div>
  );
}
