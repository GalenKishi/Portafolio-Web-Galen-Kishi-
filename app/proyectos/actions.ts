"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";

async function asegurarBucketExiste(
    supabaseAdmin: ReturnType<typeof getSupabaseAdmin>,
    bucket: string,
) {
    const { data: buckets, error } = await supabaseAdmin.storage.listBuckets();

    if (error) {
        throw new Error(`No se pudo verificar el bucket de Storage: ${error.message}`);
    }

    const exists = buckets?.some((item) => item.name === bucket);
    if (exists) return;

    const { error: createError } = await supabaseAdmin.storage.createBucket(bucket, {
        public: true,
    });

    if (createError) {
        throw new Error(`No se pudo crear el bucket "${bucket}": ${createError.message}`);
    }
}

async function subirImagen(imagen: FormDataEntryValue | null) {
    if (!(imagen instanceof File) || imagen.size === 0) {
        return undefined;
    }

    if (!imagen.type.startsWith("image/")) {
        return undefined;
    }

    const supabaseAdmin = getSupabaseAdmin();
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "proyectos";
    await asegurarBucketExiste(supabaseAdmin, bucket);
    const bytes = await imagen.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const extension = imagen.name.split(".").pop() || "jpg";
    const safeExt = extension.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "jpg";
    const fileName = `${Date.now()}-${randomUUID()}.${safeExt}`;
    const filePath = `proyectos/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
        .from(bucket)
        .upload(filePath, buffer, {
            contentType: imagen.type,
            upsert: false,
        });

    if (uploadError) {
        throw new Error(`No se pudo subir la imagen: ${uploadError.message}`);
    }

    const { data: publicData } = supabaseAdmin.storage.from(bucket).getPublicUrl(filePath);
    return publicData.publicUrl;
}

function refreshPages() {
    revalidatePath("/");
    revalidatePath("/perfil");
    revalidatePath("/proyectos");
    revalidatePath("/admin");
}

function normalizarUrl(url: string | undefined) {
    if (!url) return null;
    const clean = url.trim();
    if (!clean) return null;

    if (clean.startsWith("http://") || clean.startsWith("https://")) {
        return clean;
    }

    return `https://${clean}`;
}

export async function crearProyecto(formData: FormData) {
    await requireAdmin();

    const titulo = formData.get("titulo")?.toString().trim();
    const tecnologia = formData.get("tecnologia")?.toString().trim();
    const descripcion = formData.get("descripcion")?.toString().trim();
    const proyectoUrl = normalizarUrl(formData.get("proyectoUrl")?.toString());
    const imagen = formData.get("imagen");

    if (!titulo || !tecnologia || !descripcion) return;

    const imagenUrl = await subirImagen(imagen);

    await prisma.proyecto.create({
        data: {
            titulo,
            tecnologia,
            descripcion,
            proyectoUrl,
            imagenUrl,
            publicado: true,
        },
    } as never);

    refreshPages();
}

export async function editarProyecto(formData: FormData) {
    await requireAdmin();

    const id = Number(formData.get("id"));
    const titulo = formData.get("titulo")?.toString().trim();
    const tecnologia = formData.get("tecnologia")?.toString().trim();
    const descripcion = formData.get("descripcion")?.toString().trim();
    const proyectoUrl = normalizarUrl(formData.get("proyectoUrl")?.toString());
    const imagen = formData.get("imagen");

    if (!id || !titulo || !tecnologia || !descripcion) return;

    const imagenUrl = await subirImagen(imagen);

    await prisma.proyecto.update({
        where: { id },
        data: {
            titulo,
            tecnologia,
            descripcion,
            proyectoUrl,
            ...(imagenUrl ? { imagenUrl } : {}),
        },
    } as never);

    refreshPages();
}

export async function eliminarProyecto(formData: FormData) {
    await requireAdmin();

    const id = Number(formData.get("id"));
    if (!id) return;

    await prisma.proyecto.delete({ where: { id } });
    refreshPages();
}

export async function togglePublicacionProyecto(formData: FormData) {
    await requireAdmin();

    const id = Number(formData.get("id"));
    const publicado = formData.get("publicado")?.toString() === "true";
    if (!id) return;

    await prisma.proyecto.update({
        where: { id },
        data: { publicado: !publicado },
    } as never);

    refreshPages();
}