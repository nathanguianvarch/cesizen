import { AppSidebar } from "@/components/app-sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-10 w-full">
        <div className="flex flex-col gap-10">
          <div className="w-full">
            <p className="text-center text-4xl font-bold">
              Bonjour, Nathan Guianvarc&apos;h
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">Activités</h1>
            <div className="flex flex-wrap gap-6">
              <Card className="w-[350px] pt-0 overflow-hidden">
                <img
                  src="https://cdn.futura-sciences.com/sources/images/actu/stress-endommage-cerveau.jpg"
                  alt="Les véritables liens entre stress et dépression"
                />
                <CardHeader>
                  <CardTitle>
                    Les véritables liens entre stress et dépression
                  </CardTitle>
                  <CardDescription>
                    Cet article de Futura Sciences explore les liens
                    intrinsèques entre les mécanismes neuronaux du stress et de
                    la dépression, en détaillant comment ces deux états sont
                    interconnectés.
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
              <Card className="w-[350px] pt-0 overflow-hidden">
                <img
                  src="https://www.frcneurodon.org/app/uploads/2020/02/imagerie-cerveau.jpg"
                  alt="La dépression induite par le stress : quels sont les
                    mécanismes"
                />
                <CardHeader>
                  <CardTitle>
                    La dépression induite par le stress : quels sont les
                    mécanismes
                  </CardTitle>
                  <CardDescription>
                    Publié par la Fondation pour la Recherche sur le Cerveau,
                    cet article examine comment un stress chronique prolongé
                    peut favoriser l&apos;émergence de troubles dépressifs et
                    suicidaires, en mettant en lumière le rôle de la sérotonine
                    et de la neuroinflammation.
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">Exercices</h1>
            <div className="flex flex-wrap gap-6">
              <Card className="w-[350px] pt-0 overflow-hidden">
                <img
                  className="h-20"
                  src="https://i.pinimg.com/originals/4d/b5/96/4db596e4b97ed67a2a24efc007c320d0.png"
                  alt="Respiration diaphragmatique pour combattre l'anxiété et
                    le stress"
                />
                <CardHeader>
                  <CardTitle>
                    Respiration diaphragmatique pour combattre l&apos;anxiété et
                    le stress
                  </CardTitle>
                  <CardDescription>
                    Cet article de Livi présente la technique de respiration
                    diaphragmatique, également appelée respiration abdominale,
                    efficace pour lutter contre l&apos;anxiété, le stress et les
                    crises d&apos;angoisse. ​ Livi
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
              <Card className="w-[350px] pt-0 overflow-hidden">
                <img
                  className="h-20 w-auto"
                  src="https://i.ytimg.com/vi/XAteyee8sTc/maxresdefault.jpg"
                  alt="Les véritables liens entre stress et dépression"
                />
                <CardHeader>
                  <CardTitle>
                    5 exercices de cohérence cardiaque pour lutter contre le
                    stress
                  </CardTitle>
                  <CardDescription>
                    L&apos;IFEMDR propose cinq exercices de cohérence cardiaque
                    visant à réguler le rythme cardiaque et à réduire le stress,
                    incluant des techniques telles que l&apos;ancrage sur la
                    respiration et le plein amour.
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
