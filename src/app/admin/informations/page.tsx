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
import { Clipboard, LoaderCircle, MoreHorizontal, Trash2 } from "lucide-react";
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
import { toast } from "sonner";

type InfoRow = Database["public"]["Tables"]["information"]["Row"];

function EditableCell({
  value: initialValue,
  rowId,
  field,
}: {
  value: string;
  rowId: InfoRow["id"];
  field: keyof Pick<InfoRow, "title" | "content" | "image">;
}) {
  const [draft, setDraft] = useState(initialValue);

  const onBlur = async () => {
    if (draft !== initialValue) {
      await updateInformationById(rowId, { [field]: draft });
    }
  };

  const Comp = field === "content" ? Textarea : Input;

  return (
    <Comp
      value={draft}
      onBlur={onBlur}
      onChange={(e) => setDraft(e.target.value)}
      className={
        field === "title" ? "min-w-70" : field === "image" ? "w-48" : "w-100"
      }
      placeholder={
        field === "title"
          ? "Titre"
          : field === "image"
          ? "Lien image"
          : "Contenu"
      }
    />
  );
}

export default function ManageInformations() {
  const [informations, setInformations] = useState<InfoRow[]>([]);
  const [informationCategories, setInformationCategories] = useState<
    Database["public"]["Tables"]["information_category"]["Row"][]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const infos = await fetchInformations();
        setInformations(infos);
        const categories = await fetchInformationCategories();
        setInformationCategories(categories);
      } catch (e) {
        if (e instanceof Error) {
          toast.error(e.message);
        } else {
          toast.error("Une erreur est survenue");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteInformation = async (id: number) => {
    if (await deleteInformationById(id)) {
      setInformations((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const onAddInformationSuccess = async (
    newInformation: Database["public"]["Tables"]["information"]["Row"]
  ) => {
    setInformations((prev) => [...prev, newInformation]);
  };

  const columns: ColumnDef<InfoRow>[] = [
    {
      accessorKey: "created_at",
      header: "Créé le",
      cell: ({ row }) => {
        // on s'assure d'avoir un Date
        const date = new Date(row.original.created_at);
        return format(date, "d MMMM yyyy 'à' HH'h'mm", { locale: fr });
      },
    },
    {
      accessorKey: "title",
      header: "Titre",
      cell: ({ row }) => (
        <EditableCell
          value={row.original.title || ""}
          rowId={row.original.id}
          field="title"
        />
      ),
    },
    {
      accessorKey: "content",
      header: "Contenu",
      cell: ({ row }) => (
        <EditableCell
          value={row.original.content || ""}
          rowId={row.original.id}
          field="content"
        />
      ),
    },
    {
      accessorKey: "image",
      header: "Lien de l'image",
      cell: ({ row }) => (
        <EditableCell
          value={row.original.image || ""}
          rowId={row.original.id}
          field="image"
        />
      ),
    },
    {
      accessorKey: "category",
      header: "Catégorie",
      cell: ({ row }) => {
        const onCategoryChange = async (val: string) => {
          await updateInformationById(row.original.id, {
            category: parseInt(val, 10),
          });
        };
        return (
          <Select
            defaultValue={row.original.category?.toString()}
            onValueChange={onCategoryChange}
          >
            <SelectTrigger className="w-70">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {informationCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.title}
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
      header: "Actions",
      cell: ({ row }) => (
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
                navigator.clipboard.writeText(row.original.id.toString())
              }
            >
              <Clipboard /> Copier l&apos;ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => handleDeleteInformation(row.original.id)}
            >
              <Trash2 /> Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: informations,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return (
      <div className="flex flex-row gap-2 p-4">
        <LoaderCircle className="animate-spin" />
        Chargement des données
      </div>
    );
  }

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
      <AddInformationsDialog onSuccess={onAddInformationSuccess} />
    </div>
  );
}
