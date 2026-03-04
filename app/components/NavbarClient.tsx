"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

type NavbarClientProps = {
  isAuth: boolean;
  logoutAction: (formData: FormData) => void | Promise<void>;
};

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/perfil", label: "Perfil" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" },
];

export default function NavbarClient({ isAuth, logoutAction }: NavbarClientProps) {
    const detailsRef = useRef<HTMLDetailsElement>(null);
    const pathname = usePathname();
    const navItemsToShow = isAuth
      ? [...navItems, { href: "/admin", label: "Admin" }]
      : navItems;


    const closeMobileMenu = () => {
    if (detailsRef.current?.open) detailsRef.current.open = false;
    };

    const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    return [
        "px-3 py-1.5 rounded-full font-jersey-subtext text-base transition-colors border",
        isActive
        ? "bg-blue-600/90 border-blue-500 text-white"
        : "bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white",
    ].join(" ");
    };

  return (
    <nav className="sticky top-0 z-50 px-3 sm:px-5 pt-3" aria-label="Navegación principal">
        <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl border border-slate-700/80 bg-slate-900/75 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35)] px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-3 sm:gap-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label="Ir al inicio">
            <Image
                src="/next.svg"
                alt="Logo"
                width={32}
                height={32}
                className="h-7 w-7 sm:h-8 sm:w-8"
            />
            <span className="font-jersey-subtext text-base font-semibold text-slate-100 group-hover:text-white">
                PORTAFOLIO
            </span>
            </Link>

            <details ref={detailsRef} className="hamburger-details relative sm:hidden">
            <summary
                className="list-none [&::-webkit-details-marker]:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer"
                aria-label="Abrir menú de navegación"
            >
                <span className="hamburger-icon" aria-hidden="true">
                <span className="hamburger-line line-1" />
                <span className="hamburger-line line-2" />
                <span className="hamburger-line line-3" />
                </span>
            </summary>

              <ul className="hamburger-menu absolute right-0 mt-2 w-56 p-2 rounded-xl border border-slate-700 bg-slate-900/95 backdrop-blur shadow-xl space-y-1 text-slate-200 text-base">
              {navItemsToShow.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={getLinkClass(item.href) + " block text-center"}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

                {isAuth ? (
                <li className="pt-1">
                    <form action={logoutAction}>
                    <button className="w-full text-center bg-blue-600 text-white px-3 py-2 rounded-full font-jersey-subtext text-base font-medium hover:bg-blue-500 transition-colors">
                        Salir
                    </button>
                    </form>
                </li>
                ) : null}
            </ul>
          </details>

          <ul className="hidden sm:flex items-center gap-2">
            {navItemsToShow.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={getLinkClass(item.href)}>
                  {item.label}
                </Link>
              </li>
            ))}

            {isAuth ? (
                <li className="ml-1">
                <form action={logoutAction} className="inline-block">
                    <button className="bg-blue-600 text-white px-3 py-1.5 rounded-full font-jersey-subtext text-base font-medium hover:bg-blue-500 transition-colors">
                    Salir
                    </button>
                </form>
                </li>
            ) : null}
            </ul>
        </div>
        </div>
    </nav>
  );
}