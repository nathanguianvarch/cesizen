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
  deleteDiagnoticById,
  fetchDiagnosticsEvents,
  updateDiagnoticById,
} from "@/tools/diagnoctic";
import { Input } from "@/components/ui/input";
import { AddDiagnoticsDialog } from "@/components/AddDiagnocticsDialog";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

export default function ManageInformations() {
  const [diagnosticsEvent, setDiagnosticsEvent] = useState<
    Database["public"]["Tables"]["diagnostic_event"]["Row"][]
  >([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDiagnosticsEvents();
        setDiagnosticsEvent(data);
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

  const columns: ColumnDef<
    Database["public"]["Tables"]["diagnostic_event"]["Row"]
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
            await updateDiagnoticById(row.original.id, { title: draft });
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
      accessorKey: "points",
      header: "Points",
      cell: ({ row }) => {
        const [draft, setDraft] = useState(row.original.points!);

        const onBlur = async () => {
          if (draft != row.original.points) {
            await updateDiagnoticById(row.original.id, { points: draft });
          }
        };

        return (
          <Input
            value={draft}
            onBlur={onBlur}
            onChange={(e) => setDraft(parseInt(e.target.value))}
            maxLength={3}
            placeholder="Points"
          />
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const diagnostic_event = row.original;

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
                  navigator.clipboard.writeText(diagnostic_event.id.toString())
                }
              >
                <Clipboard />
                Copier l&apos;ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                variant="destructive"
                onClick={() => deleteDiagnoticById(row.original.id)}
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
    data: diagnosticsEvent ?? [],
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
        Gestion des diagnoctics
      </h1>
      <div className="border rounded-xl">
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

      <AddDiagnoticsDialog />
    </div>
  );
}
