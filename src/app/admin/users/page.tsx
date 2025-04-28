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
import { fetchAllUsers, updateUserById } from "@/tools/user";
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
import { Clipboard, LoaderCircle, MoreHorizontal, Trash2 } from "lucide-react";
import { deleteUserById } from "@/tools/admin";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchRoles } from "@/tools/role";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

export default function ManageUsers() {
  const [users, setUsers] = useState<
    {
      user: User;
      profile: Database["public"]["Tables"]["profile"]["Row"];
    }[]
  >([]);
  const [roles, setRoles] = useState<
    Database["public"]["Tables"]["role"]["Row"][]
  >([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetchAllUsers();
        setUsers(users);
        const roles = await fetchRoles();
        setRoles(roles);
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

  const handleDeleteUser = async (id: string) => {
    await deleteUserById(id);
    const data = await fetchAllUsers();
    setUsers(data);
  };

  const columns: ColumnDef<{
    user: User;
    profile: Database["public"]["Tables"]["profile"]["Row"];
  }>[] = [
    {
      accessorKey: "profile.created_at",
      header: "Créer le",
      cell: ({ row }) => {
        return (
          <>
            {format(
              row.original.profile.created_at,
              "d MMMM yyyy 'à' HH'h'mm",
              {
                locale: fr,
              }
            )}
          </>
        );
      },
    },
    {
      accessorKey: "profile.active",
      header: "Compte Actif",
      cell: ({ row }) => {
        const [draft, setDraft] = useState(row.original.profile.active);

        const handleChange = async () => {
          await updateUserById(row.original.user.id, { active: !draft });
          setDraft(!draft);
        };

        return <Checkbox checked={draft} onCheckedChange={handleChange} />;
      },
    },
    {
      accessorKey: "user.email",
      header: "Email",
      cell: ({ row }) => {
        return (
          <Input
            value={row.original.user.email}
            className="min-w-40"
            placeholder="Email"
            disabled
          />
        );
      },
    },
    {
      accessorKey: "profile.firstname",
      header: "Prénom",
      cell: ({ row }) => {
        const [draft, setDraft] = useState(row.original.profile.firstname);

        const onBlur = async () => {
          if (draft != row.original.profile.firstname) {
            await updateUserById(row.original.user.id, { firstname: draft });
          }
        };

        return (
          <Input
            value={draft}
            onBlur={onBlur}
            onChange={(e) => setDraft(e.target.value)}
            className="min-w-40"
            placeholder="Prénom"
          />
        );
      },
    },
    {
      accessorKey: "profile.lastname",
      header: "Nom",
      cell: ({ row }) => {
        const [draft, setDraft] = useState(row.original.profile.lastname);

        const onBlur = async () => {
          if (draft != row.original.profile.lastname) {
            await updateUserById(row.original.user.id, { lastname: draft });
          }
        };

        return (
          <Input
            value={draft}
            onBlur={onBlur}
            onChange={(e) => setDraft(e.target.value)}
            className="min-w-40"
            placeholder="Nom"
          />
        );
      },
    },
    {
      accessorKey: "profile.role.name",
      header: "Role",
      cell: ({ row }) => {
        const onRoleChange = async (roleId: string) => {
          await updateUserById(row.original.user.id, {
            role: parseInt(roleId),
          });
        };

        return (
          <Select
            defaultValue={row.original.profile.role?.toString()}
            onValueChange={onRoleChange}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Choisissez un rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {roles.map((role) => (
                  <SelectItem value={role.id.toString()} key={role.id}>
                    {role.name}
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
                onClick={() => navigator.clipboard.writeText(user.user.id)}
              >
                <Clipboard />
                Copier l&apos;ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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
