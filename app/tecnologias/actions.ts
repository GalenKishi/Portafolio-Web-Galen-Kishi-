"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function crearTecnologia(formData: FormData) {
  await requireAdmin();

  const nombre = formData.get("nombre")?.toString().trim();
  const nivel = formData.get("nivel")?.toString().trim() || "intermedio";
  const icono = formData.get("icono")?.toString().trim();

  if (!nombre) return;

  await prisma.tecnologia.create({
    data: {
      nombre,
      nivel,
      icono,
    },
  } as never);

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function editarTecnologia(formData: FormData) {
  await requireAdmin();

  const id = Number(formData.get("id"));
  const nombre = formData.get("nombre")?.toString().trim();
  const nivel = formData.get("nivel")?.toString().trim() || "intermedio";
  const icono = formData.get("icono")?.toString().trim();

  if (!id || !nombre) return;

  await prisma.tecnologia.update({
    where: { id },
    data: {
      nombre,
      nivel,
      icono,
    },
  } as never);

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function eliminarTecnologia(formData: FormData) {
  await requireAdmin();

  const id = Number(formData.get("id"));
  if (!id) return;

  await prisma.tecnologia.delete({
    where: { id },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}
