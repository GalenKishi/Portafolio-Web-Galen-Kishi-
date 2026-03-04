import { estaAutenticado } from "@/lib/session";
import { redirect } from "next/navigation";
import { loginAction } from "./actions";

type LoginProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginProps) {
  if (await estaAutenticado()) {
    redirect("/admin");
  }

  const params = await searchParams;
  const showError = params.error === "1";

  return (
    <main id="main-content" tabIndex={-1} className="page-enter min-h-screen px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-md mx-auto section-card">
        <h1 className="font-pixel-title text-xl sm:text-2xl font-bold text-white mb-2">Iniciar sesión</h1>
        <p className="font-jersey-subtext text-base sm:text-lg text-slate-300 mb-6">Acceso administrativo</p>

        {showError ? (
          <p role="alert" aria-live="assertive" className="mb-4 rounded bg-red-950/40 border border-red-700 text-red-300 px-3 py-2 text-sm">
            Usuario o contraseña incorrectos.
          </p>
        ) : null}

        <form action={loginAction} className="grid gap-4">
          <div className="grid gap-1">
            <label htmlFor="username" className="font-jersey-subtext text-base text-slate-300">
              Usuario
            </label>
            <input
              id="username"
              name="username"
              className="bg-slate-700 text-white p-2 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="password" className="font-jersey-subtext text-base text-slate-300">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="bg-slate-700 text-white p-2 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-jersey-subtext text-base font-semibold py-2 rounded transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
