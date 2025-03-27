// app/register/page.tsx (ou pages/register.tsx selon votre structure Next.js)
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Importez votre méthode d'inscription depuis better auth
import { authClient } from "@/app/lib/auth-client"; // Assurez-vous que ce module est correctement installé et configuré

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // La fonction signUp devra être adaptée à la signature de better auth
      const { data, error } = await authClient.signUp.email(
        {
          email, // user email address
          password, // user password -> min 8 characters by default
          name, // user display name
        },
        {
          onRequest: (ctx) => {
            //show loading
          },
          onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
          },
          onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
          },
        }
      );
      // Vous pouvez ensuite rediriger l’utilisateur ou afficher un message de succès
      console.log("Inscription réussie :", data);
    } catch (err: any) {
      console.error("Erreur d'inscription :", err);
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">Inscription</h1>

        <div className="mb-4">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full"
            required
          />
        </div>

        <div className="mb-6">
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mot de passe
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full"
            required
          />
        </div>

        {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Inscription en cours..." : "S'inscrire"}
        </Button>
      </form>
    </div>
  );
}
