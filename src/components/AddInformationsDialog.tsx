import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { fetchInformationCategories } from "@/tools/information_category";
import { Database } from "../../database.types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { addInformation } from "@/tools/information";

interface AddInformationsDialogProps {
  onSuccess?: (
    newInfo: Database["public"]["Tables"]["information"]["Row"]
  ) => void;
  onError?: (error: unknown) => void;
}

export function AddInformationsDialog({
  onSuccess,
}: AddInformationsDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [informationCategories, setInformationCategories] =
    useState<Database["public"]["Tables"]["information_category"]["Row"][]>();

  const handleClose = (): void => {
    setOpen(false);
  };
  const handleOpen = (): void => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const informationCategories = await fetchInformationCategories();
      setInformationCategories(informationCategories);
    };
    fetchData();
  }, []);

  const handleAddInformation = async () => {
    const addedInfo = await addInformation(
      title,
      content,
      image,
      parseInt(category)
    );
    if (addedInfo) {
      onSuccess?.(addedInfo);
    }
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpen}>Ajouter une information</Button>
      </DialogTrigger>
      <DialogContent className="w-[450px]">
        <DialogTitle>Ajouter un information</DialogTitle>
        <div className="flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Label>Titre</Label>
              <Input
                required
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row">
                <Label>Contenu</Label>
              </div>
              <Textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row">
                <Label>Lien de l&apos;image</Label>
              </div>
              <Input
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row">
                <Label>Catégorie</Label>
              </div>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisissez un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {informationCategories?.map((category) => (
                      <SelectItem
                        value={category.id.toString()}
                        key={category.id}
                      >
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" onClick={handleAddInformation}>
              Créer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
