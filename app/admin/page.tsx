import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import Image from "next/image";
import ImageDropInput from "../components/ImageDropInput";
import UploadSubmitButton from "../components/UploadSubmitButton";
import {
    crearProyecto,
    editarProyecto,
    eliminarProyecto,
    togglePublicacionProyecto,
} from "../proyectos/actions";
import {
    crearTecnologia,
    editarTecnologia,
    eliminarTecnologia,
} from "../tecnologias/actions";

export const runtime = "nodejs";

type ProyectoAdmin = {
  id: number;
  titulo: string;
  descripcion: string;
  tecnologia: string;
  proyectoUrl: string | null;
  imagenUrl: string | null;
  publicado: boolean;
};

export default async function AdminPage() {
  await requireAdmin();

  const proyectos = (await prisma.proyecto.findMany({
    orderBy: { id: "desc" },
  } as never)) as unknown as ProyectoAdmin[];

  const tecnologias = (await prisma.tecnologia.findMany({
    orderBy: { id: "asc" },
  } as never)) as unknown as { id: number; nombre: string; nivel: string; icono?: string }[];

  return (
    <main id="main-content" tabIndex={-1} className="page-enter pt-24 min-h-screen px-8 pb-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-pixel-title text-4xl font-bold text-white mb-8">Panel de Administración</h1>

        <form
          action={crearProyecto}
          className="bg-slate-800 p-6 rounded-xl mb-10 border border-slate-700"
        >
          <h2 className="font-jersey-subtitle text-xl text-blue-400 mb-4 font-semibold">Nuevo proyecto</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              name="titulo"
              placeholder="Titulo del proyecto"
              className="bg-slate-700 text-white p-2 rounded border border-slate-600 focus:outline-none focus:border-blue-500 placeholder:text-slate-300 placeholder:opacity-100"
              required
            />

            <input
              name="tecnologia"
              placeholder="Tecnologías"
              className="bg-slate-700 text-white p-2 rounded border border-slate-600 focus:outline-none focus:border-blue-500 placeholder:text-slate-300 placeholder:opacity-100"
              required
            />
            <textarea
              name="descripcion"
              placeholder="Descripción"
              className="bg-slate-700 text-white p-2 rounded border border-slate-600  placeholder:text-slate-300 placeholder:opacity-100 focus:outline-none focus:border-blue-500"
              required
            />
            <input
              name="proyectoUrl"
              placeholder="URL del proyecto (ej: https://mi-proyecto.com)"
              className="bg-slate-700 text-white p-2 rounded border border-slate-600 focus:outline-none focus:border-blue-500 placeholder:text-slate-300 placeholder:opacity-100"
            />
            <ImageDropInput />
            <UploadSubmitButton
              idleLabel="Guardar"
              pendingLabel="Cargando imagen..."
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            />
          </div>
        </form>

        <div className="grid grid-cols-1 gap-6">
          {proyectos.map((proy) => (
            <section key={proy.id} className="p-6 bg-slate-800 rounded-xl border border-slate-700">
              {proy.imagenUrl ? (
                <Image
                  src={proy.imagenUrl}
                  alt={proy.titulo}
                  width={800}
                  height={400}
                  className="w-full h-48 object-cover rounded-lg mb-4 border border-slate-700"
                />
              ) : null}

              <form action={editarProyecto} className="grid gap-3">
                <input type="hidden" name="id" value={proy.id} />
                <input
                  name="titulo"
                  defaultValue={proy.titulo}
                  className="bg-slate-700 text-white p-2 rounded border border-slate-600"
                  required
                />
                <input
                  name="tecnologia"
                  defaultValue={proy.tecnologia}
                  className="bg-slate-700 text-white p-2 rounded border border-slate-600"
                  required
                />
                <textarea
                  name="descripcion"
                  defaultValue={proy.descripcion}
                  className="bg-slate-700 text-white p-2 rounded border border-slate-600"
                  required
                />
                <input
                  name="proyectoUrl"
                  defaultValue={proy.proyectoUrl || ""}
                  placeholder="URL del proyecto"
                  className="bg-slate-700 text-white p-2 rounded border border-slate-600"
                />
                <label className="text-sm text-slate-300">Cambiar imagen (opcional)</label>
                <input
                  type="file"
                  name="imagen"
                  accept="image/*"
                  className="text-sm text-slate-300"
                />
                <UploadSubmitButton
                  idleLabel="Guardar cambios"
                  pendingLabel="Cargando imagen..."
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded disabled:opacity-70 disabled:cursor-not-allowed"
                />
              </form>

              <div className="mt-4 flex flex-wrap gap-3">
                <form action={togglePublicacionProyecto}>
                  <input type="hidden" name="id" value={proy.id} />
                  <input type="hidden" name="publicado" value={String(proy.publicado)} />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-sm"
                  >
                    {proy.publicado ? "Ocultar del público" : "Publicar"}
                  </button>
                </form>

                <form action={eliminarProyecto}>
                  <input type="hidden" name="id" value={proy.id} />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-red-700 hover:bg-red-600 text-white text-sm"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="font-jersey-subtitle text-2xl font-bold text-white mb-6">Gestionar Tecnologías</h2>

          <form action={crearTecnologia} className="bg-slate-800 p-6 rounded-xl mb-6 border border-slate-700">
            <h3 className="text-lg text-blue-400 mb-3 font-semibold">Nueva tecnología</h3>
            <div className="grid grid-cols-1 gap-3">
              <input
                name="nombre"
                placeholder="Nombre (ej: React, Node.js, Python)"
                className="bg-slate-700 text-white p-2 rounded border border-slate-600  placeholder:text-slate-300 focus:border-blue-500"
                required
              />
              <select
                name="nivel"
                defaultValue="intermedio"
                className="bg-slate-700 text-white p-2 rounded border border-slate-600  placeholder:text-slate-300 placeholder:opacity-100 focus:outline-none focus:border-blue-500">
                <option value="principiante">Principiante</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
                <option value="experto">Experto</option>
              </select>
              <input
                name="icono"
                placeholder="Ícono (emoji o URL opcional)"
                className="bg-slate-700 text-white p-2 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded transition-colors"
              >
                Agregar
              </button>
            </div>
          </form>

          {tecnologias.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tecnologias.map((tech) => (
                <div key={tech.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <form action={editarTecnologia} className="grid gap-2 mb-3">
                    <input type="hidden" name="id" value={tech.id} />
                    <input
                      name="nombre"
                      defaultValue={tech.nombre}
                      className="bg-slate-700 text-white p-2 rounded border border-slate-600 text-sm"
                      required
                    />
                    <select name="nivel" defaultValue={tech.nivel} className="bg-slate-700 text-white p-2 rounded border border-slate-600 text-sm">
                      <option value="principiante">Principiante</option>
                      <option value="intermedio">Intermedio</option>
                      <option value="avanzado">Avanzado</option>
                      <option value="experto">Experto</option>
                    </select>
                    <input
                      name="icono"
                      defaultValue={tech.icono || ""}
                      placeholder="Ícono (opcional)"
                      className="bg-slate-700 text-white p-2 rounded border border-slate-600 text-sm"
                    />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-sm py-2 rounded">
                      Guardar
                    </button>
                  </form>
                  <form action={eliminarTecnologia}>
                    <input type="hidden" name="id" value={tech.id} />
                    <button type="submit" className="w-full bg-red-700 hover:bg-red-600 text-white text-sm py-1 rounded">
                      Eliminar
                    </button>
                  </form>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">No hay tecnologías agregadas aún.</p>
          )}
        </div>
      </div>
    </main>
  );
}
