"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Icon from "@/components/Icon";

const pestanas = [
  { href: "/ventas", label: "Listado", icono: "recibo" },
  { href: "/ventas/create", label: "Nueva venta", icono: "mas" },
];

// Layout anidado de la sección /ventas. Solo se entra con sesión iniciada.
export default function VentasLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    let cancelado = false;

    async function comprobarAcceso() {
      const token = sessionStorage.getItem("access");

      if (!token) {
        router.replace("/account/login");
        return;
      }

      if (!cancelado) {
        setAutorizado(true);
      }
    }

    comprobarAcceso();

    return () => {
      cancelado = true;
    };
  }, [router]);

  if (!autorizado) {
    return (
      <p className="container-page flex items-center gap-2 py-16 text-sm text-muted-foreground">
        <span className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        Verificando sesión...
      </p>
    );
  }

  return (
    <div className="container-page flex flex-1 flex-col gap-8 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="page-title">Ventas</h1>
          <p className="page-subtitle">Registrá y consultá las ventas de la tienda.</p>
        </div>
        <nav className="flex max-w-full gap-1 overflow-x-auto rounded-xl border border-border bg-muted/50 p-1">
          {pestanas.map((pestana) => (
            <Link
              key={pestana.href}
              href={pestana.href}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
                pathname === pestana.href
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name={pestana.icono} className="size-4" />
              {pestana.label}
            </Link>
          ))}
        </nav>
      </div>
      {children}
    </div>
  );
}
