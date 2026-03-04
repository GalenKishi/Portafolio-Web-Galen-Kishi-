import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Canales de contacto para oportunidades laborales, colaboraciones y propuestas de proyectos.",
};

export default function ContactoPage() {
  return (
    <main id="main-content" tabIndex={-1} className="page-enter pt-20 sm:pt-24 min-h-screen px-4 sm:px-6 md:px-8 pb-10 sm:pb-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 section-card">
          <h1 id="contacto-titulo" className="font-pixel-title text-3xl sm:text-4xl font-bold text-white">Contacto</h1>
          <p className="font-jersey-subtext text-base sm:text-lg text-slate-300 mt-3">
            Puedes escribirme para vacantes, proyectos freelance o colaboraciones.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" aria-labelledby="contacto-titulo">
          <a
            href="mailto:galenarturo@gmail.com"
            className="project-card bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-4 rounded text-center"
          >
            Email
          </a>
          <a
            href="https://github.com/GalenKishi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir GitHub en una pestaña nueva"
            className="project-card bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-semibold px-4 py-4 rounded text-center"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/galen-kishi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir LinkedIn en una pestaña nueva"
            className="project-card bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-semibold px-4 py-4 rounded text-center"
          >
            LinkedIn
          </a>
        </section>

        <section className="section-card">
          <h2 className="font-jersey-subtitle text-xl sm:text-2xl text-blue-300 font-semibold mb-3">Disponibilidad</h2>
          <ul className="text-base sm:text-lg text-slate-300 space-y-2">
            <li>• Modalidad: remoto.</li>
            <li>• Rol: Desarrollo web full stack y programación de videojuegos.</li>
            <li>• Tiempo de respuesta habitual: 24 a 48 horas.</li>
          </ul>
          <p className="text-xs text-slate-400 mt-4">
          </p>
        </section>
      </div>
    </main>
  );
}