"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthControls from "@/components/AuthControls";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/ventas", label: "Ventas" },
  { href: "/about/contacto", label: "Contacto" },
  { href: "/estadisticas", label: "Estadísticas" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Marca como activo el link de la sección en la que está la persona
  const esActivo = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const claseLink = (href) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      esActivo(href)
        ? "bg-muted text-foreground"
        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          onClick={() => setMenuAbierto(false)}
          className="rounded-lg"
        >
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={claseLink(link.href)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <div className="hidden md:block">
            <AuthControls />
          </div>

          <button
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="btn btn-ghost btn-icon md:hidden"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
          >
            <Icon name={menuAbierto ? "cerrar" : "menu"} />
          </button>
        </div>
      </nav>

      {/* Menú del celular */}
      {menuAbierto && (
        <div className="border-t border-border md:hidden">
          <ul className="container-page flex flex-col gap-1 py-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuAbierto(false)}
                  className={`block ${claseLink(link.href)}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="container-page pb-4">
            <AuthControls />
          </div>
        </div>
      )}
    </header>
  );
}
