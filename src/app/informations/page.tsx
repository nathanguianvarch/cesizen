"use client";
import { useEffect, useState } from "react";
import { Database } from "../../../database.types";
import {
  fetchInformationCategories,
  fetchInformations,
} from "@/tools/information";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export default function InformationsPage() {
  const [informations, setInformations] = useState<
    Database["public"]["Tables"]["information"]["Row"][]
  >([]);
  const [informationsCategories, setInformationsCategories] = useState<
    Database["public"]["Tables"]["information_category"]["Row"][]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const dataInformationsCategories = await fetchInformationCategories();
      setInformationsCategories(dataInformationsCategories);
      const dataInformations = await fetchInformations();
      setInformations(dataInformations);
      setLoading(false);
    };
    getData();
    const fetchData = async () => {
      try {
        const dataInformationsCategories = await fetchInformationCategories();
        setInformationsCategories(dataInformationsCategories);
        const dataInformations = await fetchInformations();
        setInformations(dataInformations);
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
      <h1 className="text-5xl font-bold">Informations</h1>
      <div className="flex flex-col gap-6">
        {informationsCategories.map((category) => (
          <div className="flex flex-col gap-4" key={category.id}>
            <h2 className="text-2xl font-semibold">• {category.title}</h2>
            <div className="flex flex-wrap gap-4">
              {informations
                .filter((information) => information.category === category.id)
                .map((information) => (
                  <Card
                    className="max-w-90 h-full pt-0 overflow-hidden gap-2"
                    key={information.id}
                  >
                    {information.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={information.image}
                        className="max-h-40 object-cover"
                        alt=""
                      />
                    )}
                    <CardHeader>
                      <h3 className="text-lg font-semibold">
                        <a
                          href={information.url ?? ""}
                          className="hover:text-black/60"
                        >
                          {information.title}
                        </a>
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p>{information.content}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
