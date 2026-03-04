import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export const runtime = "nodejs";

type ProyectoView = {
  id: number;
  titulo: string;
  descripcion: string;
  tecnologia: string;
  imagenUrl?: string | null;
};

export default async function HomePage() {
  const proyectos = (await prisma.proyecto.findMany({
    where: { publicado: true },
    orderBy: { id: "desc" },
    take: 4,
  } as never)) as ProyectoView[];

  const totalPublicados = await prisma.proyecto.count({
    where: { publicado: true },
  } as never);

  const tecnologias = (await prisma.tecnologia.findMany({
    orderBy: { id: "asc" },
  } as never)) as { id: number; nombre: string; nivel?: string; icono?: string }[];

  const resumenProyecto = (texto: string) =>
    texto.length > 120 ? `${texto.slice(0, 120).trim()}...` : texto;

  return (
    <main id="main-content" tabIndex={-1} className="page-enter pt-20 sm:pt-24 min-h-screen px-4 sm:px-6 md:px-8 pb-10 sm:pb-12">
      <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
        <section className="mb-10 section-card reveal" aria-labelledby="inicio-resumen">
          <h1 id="inicio-resumen" className="font-pixel-title text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Desarrollador de Paginas Web y Programador de Videojuegos.
          </h1>
          <p className="font-jersey-subtext text-base sm:text-lg text-slate-300 mb-5 sm:mb-6">
            Este inicio es un resumen de mi perfil, las tecnologías que manejo y una vista rápida de mis proyectos publicados.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/perfil" className="interactive-btn bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded">
              Ver perfil completo
            </Link>
            <Link href="/proyectos" className="interactive-btn bg-slate-700 hover:bg-slate-600 text-white font-semibold px-4 py-2 rounded border border-slate-600">
              Ver proyectos
            </Link>
          </div>
        </section>

        <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 reveal reveal-delay-1" aria-labelledby="inicio-sobre-mi">
          <article className="section-card">
            <h2 id="inicio-sobre-mi" className="font-jersey-subtitle text-xl sm:text-2xl text-blue-300 font-semibold mb-3">Sobre mí</h2>
            <p className="font-jersey-subtext text-base sm:text-lg text-slate-300 mb-4">
              Construyo productos web completos, desde la base de datos hasta interfaces claras y rápidas.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="font-jersey-subtext text-base sm:text-lg text-slate-300 mb-4 rounded border border-slate-700 bg-slate-900/40 px-3 py-2"> proyectos publicados + {totalPublicados}</div>
              <div className="font-jersey-subtext text-base sm:text-lg text-slate-300 mb-4 rounded border border-slate-700 bg-slate-900/40 px-3 py-2">Full Stack y Programador de Videojuegos</div>
            </div>
          </article>

          <article className="section-card">
            <h2 className="font-jersey-subtitle text-xl sm:text-2xl text-blue-300 font-semibold mb-3">Tecnologías</h2>
            <div className="flex flex-wrap gap-2">
              {tecnologias.map((tecnologia) => (
                <span
                  key={tecnologia.id}
                  className="rounded-full border border-slate-600 bg-slate-700 px-3 py-1 text-xs font-jersey-subtext"
                >
                  {tecnologia.icono ? `${tecnologia.icono} ` : ""}{tecnologia.nombre}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section id="proyectos" className="reveal reveal-delay-2" aria-labelledby="inicio-proyectos">
          <h2 id="inicio-proyectos" className="font-jersey-subtitle text-xl sm:text-2xl text-blue-300 font-semibold mb-4">Proyectos destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {proyectos.map((proy, index) => (
              <div
                key={proy.id}
                className="project-card section-card reveal"
                style={{ animationDelay: `${240 + index * 90}ms` }}
              >
                {proy.imagenUrl ? (
                  <Image
                    src={proy.imagenUrl}
                    alt={proy.titulo}
                    width={800}
                    height={400}
                    className="w-full h-44 sm:h-48 object-cover rounded-lg mb-4 border border-slate-700"
                  />
                ) : null}
                <h3 className="text-xl font-bold text-blue-400">{proy.titulo}</h3>
                <p className="font-jersey-subtext text-base sm:text-lg text-slate-300 mt-2">{resumenProyecto(proy.descripcion)}</p>
                <p className="mt-4 text-xs font-mono text-blue-300">{proy.tecnologia}</p>
              </div>
            ))}

            {proyectos.length === 0 ? (
              <div className="section-card font-jersey-subtext text-base text-slate-300">
                Aún no hay proyectos publicados. Pronto agregaré nuevos trabajos aquí.
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}