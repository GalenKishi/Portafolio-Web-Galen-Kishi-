import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export const runtime = "nodejs";

type ProyectoPublico = {
  id: number;
  titulo: string;
  descripcion: string;
  tecnologia: string;
  proyectoUrl?: string | null;
  imagenUrl: string | null;
};

export default async function ProyectosPage() {
  const proyectos = (await prisma.proyecto.findMany({
    where: { publicado: true },
    orderBy: { id: "desc" },
  } as never)) as unknown as ProyectoPublico[];

  return (
    <main id="main-content" tabIndex={-1} className="page-enter pt-20 sm:pt-24 min-h-screen px-4 sm:px-6 md:px-8 pb-10 sm:pb-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 section-card">
          <h1 id="proyectos-titulo" className="font-pixel-title text-3xl sm:text-4xl font-bold text-white mb-3">Mis Proyectos</h1>
          <p className="font-jersey-subtext text-base sm:text-lg text-slate-300">
            Aquí se muestran los proyectos que he realizado, con su descripción, imagen y enlace directo.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" aria-labelledby="proyectos-titulo">
          {proyectos.map((proyecto) => (
            <article
              key={proyecto.id}
              className="project-card section-card"
            >
              {proyecto.imagenUrl ? (
                <Image
                  src={proyecto.imagenUrl}
                  alt={proyecto.titulo}
                  width={800}
                  height={420}
                  className="w-full h-44 sm:h-52 object-cover rounded-lg mb-4 border border-slate-700"
                />
              ) : null}

              <h2 className="text-xl sm:text-2xl font-bold text-blue-300">{proyecto.titulo}</h2>
              <p className="font-jersey-subtext text-base sm:text-lg text-slate-300 mt-3">{proyecto.descripcion}</p>
              <p className="text-xs font-mono text-blue-200 mt-4">{proyecto.tecnologia}</p>

              {proyecto.proyectoUrl ? (
                <a
                  href={proyecto.proyectoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver proyecto ${proyecto.titulo} en una pestaña nueva`}
                  className="inline-block mt-5 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded"
                >
                  Ver proyecto
                </a>
              ) : (
                <span className="inline-block mt-5 font-jersey-subtext text-base text-slate-400">
                  Enlace del proyecto no disponible todavía.
                </span>
              )}
            </article>
          ))}

          {proyectos.length === 0 ? (
            <div className="section-card font-jersey-subtext text-base text-slate-300">
              Aún no hay proyectos publicados.
            </div>
          ) : null}
        </section>

        <div className="mt-10">
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Volver al Inicio
          </Link>
        </div>
      </div>
    </main>
  );
}