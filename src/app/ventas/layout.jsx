"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Layout anidado de la sección /ventas. Solo se entra con sesión iniciada.
export default function VentasLayout({ children }) {
  const router = useRouter();
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
    return <p>Verificando sesión...</p>;
  }

  return (
    <div>
      <div>
        <h1>Ventas</h1>
        <nav>
          <Link href="/ventas">
            Listado
          </Link>
          <Link href="/ventas/create">
            Nueva venta
          </Link>
        </nav>
      </div>
      {children}
    </div>
  );
}
