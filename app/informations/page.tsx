import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Informations - CESIZen",
  description: "Informations sur la santé mentale et sa prévention",
};

export default function InformationsPage() {
  <div className="flex min-h-screen flex-col">
    <main className="flex-1 py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Informations sur la santé mentale
            </h1>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Découvrez des ressources fiables pour comprendre et prendre soin
              de votre santé mentale.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-4xl py-12">
          <Tabs defaultValue="comprendre" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="comprendre">Comprendre</TabsTrigger>
              <TabsTrigger value="prevenir">Prévenir</TabsTrigger>
              <TabsTrigger value="agir">Agir</TabsTrigger>
              <TabsTrigger value="ressources">Ressources</TabsTrigger>
            </TabsList>
            <TabsContent value="comprendre" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Qu&apos;est-ce que la santé mentale?</CardTitle>
                  <CardDescription>Définition et concepts clés</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    La santé mentale est un état de bien-être dans lequel une
                    personne peut se réaliser, surmonter les tensions normales
                    de la vie, accomplir un travail productif et contribuer à la
                    vie de sa communauté.
                  </p>
                  <p className="mt-4">
                    Elle ne se résume pas à l&apos;absence de troubles mentaux.
                    Elle est influencée par de nombreux facteurs : biologiques,
                    psychologiques, sociaux et environnementaux.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Le stress et ses mécanismes</CardTitle>
                  <CardDescription>
                    Comment fonctionne le stress dans notre corps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Le stress est une réponse naturelle de l&apos;organisme face
                    à une situation perçue comme menaçante ou exigeante. Il
                    déclenche une série de réactions physiologiques et
                    psychologiques destinées à nous préparer à l&apos;action.
                  </p>
                  <p className="mt-4">
                    Bien que le stress ponctuel soit normal et même bénéfique,
                    le stress chronique peut avoir des conséquences néfastes sur
                    la santé physique et mentale.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="prevenir" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Prévention au quotidien</CardTitle>
                  <CardDescription>
                    Habitudes et pratiques pour préserver sa santé mentale
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Adopter des habitudes de vie saines est essentiel pour
                    préserver sa santé mentale : activité physique régulière,
                    alimentation équilibrée, sommeil de qualité, gestion du
                    stress...
                  </p>
                  <p className="mt-4">
                    Cultiver des relations sociales positives et maintenir un
                    équilibre entre vie professionnelle et personnelle sont
                    également des facteurs protecteurs importants.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Signes d&apos;alerte</CardTitle>
                  <CardDescription>
                    Reconnaître les signaux qui doivent alerter
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Certains signes peuvent indiquer une détresse psychologique
                    : changements d&apos;humeur importants, fatigue persistante,
                    troubles du sommeil, isolement social, perte d&apos;intérêt
                    pour les activités habituelles...
                  </p>
                  <p className="mt-4">
                    Il est important de rester attentif à ces signaux, chez soi
                    comme chez les autres, et de ne pas hésiter à demander de
                    l&apos;aide si nécessaire.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="agir" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Techniques de gestion du stress</CardTitle>
                  <CardDescription>
                    Méthodes efficaces pour réduire le stress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    De nombreuses techniques peuvent aider à gérer le stress :
                    respiration profonde, méditation, pleine conscience,
                    activité physique, relaxation musculaire progressive...
                  </p>
                  <p className="mt-4">
                    L&apos;important est de trouver celles qui vous conviennent
                    le mieux et de les pratiquer régulièrement, avant même que
                    le stress ne devienne trop important.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    Quand et comment chercher de l&apos;aide
                  </CardTitle>
                  <CardDescription>
                    Les ressources disponibles en cas de besoin
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Si vous ressentez une détresse psychologique importante ou
                    persistante, n&apos;hésitez pas à consulter un professionnel
                    : médecin traitant, psychologue, psychiatre...
                  </p>
                  <p className="mt-4">
                    Des lignes d&apos;écoute sont également disponibles pour
                    vous accompagner en cas de besoin, comme le 3114 (numéro
                    national de prévention du suicide).
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="ressources" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sites officiels</CardTitle>
                  <CardDescription>
                    Ressources gouvernementales et institutionnelles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Ministère de la Santé et de la Prévention -
                      www.sante.gouv.fr
                    </li>
                    <li>Santé Publique France - www.santepubliquefrance.fr</li>
                    <li>Psycom - www.psycom.org</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Numéros d&apos;urgence</CardTitle>
                  <CardDescription>
                    Contacts en cas de besoin immédiat
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      3114 - Numéro national de prévention du suicide (24h/24,
                      7j/7)
                    </li>
                    <li>15 - SAMU</li>
                    <li>112 - Numéro d&apos;urgence européen</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  </div>;
}
