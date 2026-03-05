import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export const runtime = "nodejs";

type ProyectoPerfil = {
  id: number;
  titulo: string;
  descripcion: string;
  tecnologia: string;
  imagenUrl: string | null;
};

export default async function PerfilPage() {
  let proyectos: ProyectoPerfil[] = [];
  let tecnologias: { id: number; nombre: string; nivel?: string; icono?: string }[] = [];
  let hasDataError = false;

  try {
    proyectos = (await prisma.proyecto.findMany({
      where: { publicado: true },
      orderBy: { id: "desc" },
    } as never)) as ProyectoPerfil[];

    tecnologias = (await prisma.tecnologia.findMany({
      orderBy: { id: "asc" },
    } as never)) as { id: number; nombre: string; nivel?: string; icono?: string }[];
  } catch (error) {
    hasDataError = true;
    console.error("Error cargando perfil:", error);
  }

  return (
    <main id="main-content" tabIndex={-1} className="page-enter pt-20 sm:pt-24 min-h-screen px-4 sm:px-6 md:px-8 pb-10 sm:pb-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 section-card">
          <h1 id="perfil-titulo" className="font-pixel-title text-3xl sm:text-4xl font-bold text-white">Profesional</h1>
          {hasDataError ? (
            <p role="status" className="font-jersey-subtext text-sm text-amber-300 mt-3">
              Datos dinámicos temporalmente no disponibles.
            </p>
          ) : null}
          <p className="font-jersey-subtext text-base sm:text-lg text-slate-300 mt-3">
            Saludos y bienvenido a mi perfil profesional. Aquí encontrarás información detallada sobre mis habilidades, experiencia, proyectos y formación académica. Mi enfoque es el desarrollo de páginas web completas y la programación de videojuegos, combinando conocimientos técnicos con creatividad para construir soluciones digitales efectivas. Explora las secciones para conocer más sobre mi trayectoria, las tecnologías que manejo y los proyectos que he realizado. Si estás interesado en colaborar o tienes alguna oportunidad en mente, no dudes en contactarme a través de la sección de contacto. ¡Gracias por visitar mi perfil!
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10" aria-labelledby="perfil-sobre-mi">
          <article className="section-card">
            <h2 id="perfil-sobre-mi" className="font-jersey-subtitle text-xl sm:text-2xl font-semibold text-blue-400 mb-3">Sobre mí</h2>
            <p className="font-jersey-subtext text-base sm:text-lg text-slate-300 mb-4">
              Soy desarrollador enfocado en crear experiencias digitales funcionales y claras,
              combinando arquitectura backend, interfaces modernas y soluciones orientadas a resultados.
            </p>
          </article>

          <article className="section-card">
            <h2 className="font-jersey-subtitle text-xl sm:text-2xl font-semibold text-blue-400 mb-3">Intereses y enfoque</h2>
            <ul className="text-sm sm:text-base text-slate-300 space-y-2">
              <li className="font-jersey-subtext text-base sm:text-lg text-slate-300 mb-4">• Desarrollo de páginas web completas, desde la base de datos hasta el frontend.</li>
              <li className="font-jersey-subtext text-base sm:text-lg text-slate-300 mb-4">• Programación de videojuegos con foco en mecánicas, rendimiento y experiencia de usuario.</li>
              <li className="font-jersey-subtext text-base sm:text-lg text-slate-300 mb-4">• Mejora continua en calidad del código, escalabilidad y mantenibilidad.</li>
            </ul>
          </article>

        </section>

        <section className="section-card mb-10" aria-labelledby="perfil-implementaciones">
          <h2 id="perfil-implementaciones" className="font-jersey-subtitle text-xl sm:text-2xl font-semibold text-blue-400 mb-4">Implementaciones que realizo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded border border-slate-700 bg-slate-900/40 p-4">
              <h3 className="font-semibold text-white mb-2">Desarrollo web</h3>
              <p className="font-jersey-subtext text-base sm:text-lg text-slate-300 mb-4">
                Implementación de aplicaciones con autenticación, panel de administración,
                gestión de contenidos, conexión con base de datos y despliegue.
              </p>
            </div>
            <div className="rounded border border-slate-700 bg-slate-900/40 p-4">
              <h3 className="font-semibold text-white mb-2">Desarrollo de videojuegos</h3>
              <p className="font-jersey-subtext text-base sm:text-lg text-slate-300 mb-4">
                Diseño e implementación de sistemas de juego, interacción, UI in-game y lógica de progresión.
              </p>
            </div>
            <div className="rounded border border-slate-700 bg-slate-900/40 p-4">
              <h3 className="font-semibold text-white mb-2">Optimización y mantenimiento</h3>
              <p className="font-jersey-subtext text-base sm:text-lg text-slate-300 mb-4">
                Mejora de rendimiento, refactorización de código, actualización tecnológica y solución de bugs.
              </p>
            </div>
            <div className="rounded border border-slate-700 bg-slate-900/40 p-4">
              <h3 className="font-semibold text-white mb-2">Colaboración y asesoría</h3>
              <p className="font-jersey-subtext text-base sm:text-lg text-slate-300 mb-4">
                Trabajo en equipo, revisión de código, mentoría técnica y asesoría en arquitectura de software.
              </p>
            </div>
            <div className="rounded border border-slate-700 bg-slate-900/40 p-4">
              <h3 className="font-semibold text-white mb-2">Desarrollo de APIs</h3>
              <p className="font-jersey-subtext text-base sm:text-lg text-slate-300 mb-4">
                Creación y mantenimiento de APIs RESTful y GraphQL, integración con servicios externos y optimización de endpoints.
              </p>
            </div>
            
            </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10" aria-labelledby="perfil-lenguajes">
          <article className="section-card">
            <h2 id="perfil-lenguajes" className="font-jersey-subtitle text-xl sm:text-2xl font-semibold text-blue-400 mb-4">Lenguajes y tecnologías</h2>
            <div className="flex flex-wrap gap-2">
              {tecnologias.map((tecnologia) => (
                <span
                  key={tecnologia.id}
                  className="rounded-full border border-slate-600 bg-slate-700 px-3 py-1 text-xs text-slate-200"
                >
                  {tecnologia.icono ? `${tecnologia.icono} ` : ""}
                  {tecnologia.nombre}
                  {tecnologia.nivel ? ` · ${tecnologia.nivel}` : ""}
                </span>
              ))}
              {tecnologias.length === 0 ? (
                <p className="font-jersey-subtext text-base sm:text-lg text-slate-300 mb-4">Aún no agregaste tecnologías desde admin.</p>
              ) : null}
            </div>
          </article>

          <article className="section-card">
            <h2 className="font-jersey-subtitle text-xl sm:text-2xl font-semibold text-blue-400 mb-4">Formación</h2>
            <ul className="text-slate-300 space-y-2 text-sm">
              <li className="font-jersey-subtext text-base sm:text-lg text-slate-300 mb-4">• Institución principal: Universidad AMERIKE</li>
              <li className="font-jersey-subtext text-base sm:text-lg text-slate-300 mb-4">• Cursos o certificaciones: U-ECHO Training Unreal Engine 5.</li>
              <li className="font-jersey-subtext text-base sm:text-lg text-slate-300 mb-4">• Enfoque académico: desarrollo web, programación y diseño de sistemas.</li>
            </ul>
          </article>
        </section>

        <section aria-labelledby="perfil-proyectos">
          <h2 id="perfil-proyectos" className="font-jersey-subtitle text-xl sm:text-2xl font-semibold text-blue-400 mb-5">Proyectos publicados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {proyectos.map((proy) => (
              <article
                key={proy.id}
                className="project-card section-card"
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
                <h3 className="text-xl font-bold text-blue-300">{proy.titulo}</h3>
                <p className="font-jersey-subtext text-base sm:text-lg text-slate-300 mt-2">{proy.descripcion}</p>
                <p className="mt-3 text-xs font-mono text-blue-200">{proy.tecnologia}</p>
              </article>
            ))}

            {proyectos.length === 0 ? (
              <div className="section-card font-jersey-subtext text-base text-slate-300">
                Aún no tienes trabajos publicados. Puedes agregarlos desde el panel de administración.
              </div>
            ) : null}
          </div>
        </section>

        <section className="mt-10 section-card">
          <h2 className="font-jersey-subtitle text-xl sm:text-2xl text-blue-300 font-semibold mb-3">Conoce más</h2>
          <p className="font-jersey-subtext text-base sm:text-lg text-slate-300 mb-4">
            Si quieres hablar sobre oportunidades de trabajo o colaboraciones, puedes contactarme directamente.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded"
          >
            Ir a contacto
          </Link>
        </section>
      </div>
    </main>
  );
}
