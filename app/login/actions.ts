"use server";

import { cerrarSesion, iniciarSesion } from "@/lib/session";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const username = formData.get("username")?.toString().trim() || "";
  const password = formData.get("password")?.toString().trim() || "";

  const ok = await iniciarSesion(username, password);

  if (!ok) {
    redirect("/login?error=1");
  }

  redirect("/admin");
}

export async function logoutAction() {
  await cerrarSesion();
  redirect("/login");
}
