"use client";
import { useEffect, useState } from "react";
import { Database } from "../../../database.types";
import {
  fetchInformationCategories,
  fetchInformations,
} from "@/tools/information";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function InformationsPage() {
  const [informations, setInformations] = useState<
    Database["public"]["Tables"]["information"]["Row"][]
  >([]);
  const [informationsCategories, setInformationsCategories] = useState<
    Database["public"]["Tables"]["information_category"]["Row"][]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

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
  }, []);

  return (
    <div className="m-4 flex flex-col gap-4">
      <h1 className="text-5xl font-bold">Informations</h1>
      <div className="flex flex-col gap-6">
        {loading ? (
          <p>Chargement en cours ...</p>
        ) : informationsCategories.length === 0 ? (
          <p>Aucune donnée</p>
        ) : (
          informationsCategories.map((category) => (
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
          ))
        )}
      </div>
    </div>
  );
}
