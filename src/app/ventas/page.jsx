"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import VentaCard from "@/components/VentaCard";
import { listarVentas } from "@/lib/api";

export default function VentasPage() {
  const [ventas, setVentas] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [total, setTotal] = useState(null);
  const [haySiguiente, setHaySiguiente] = useState(false);
  const [hayAnterior, setHayAnterior] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelado = false;

    async function cargarVentas() {
      setCargando(true);
      setError("");

      try {
        const data = await listarVentas(pagina);

        if (cancelado) return;

        setVentas(data.results ?? []);
        setTotal(data.count ?? null);
        setHaySiguiente(Boolean(data.next));
        setHayAnterior(Boolean(data.previous));
      } catch (err) {
        if (!cancelado) {
          setVentas([]);
          setError(err.message);
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    }

    cargarVentas();

    return () => {
      cancelado = true;
    };
  }, [pagina]);

  return (
    <section>
      <div>
        <h2>
          Listado de ventas{total !== null && ` (${total})`}
        </h2>
        <Link href="/ventas/create">
          Nueva venta
        </Link>
      </div>

      {error && (
        <p role="alert">
          {error}
        </p>
      )}

      {cargando ? (
        <p>Cargando ventas...</p>
      ) : !error && ventas.length === 0 ? (
        <p>Todavía no hay ventas cargadas.</p>
      ) : !error ? (
        <>
          <div>
            {ventas.map((venta) => (
              <VentaCard key={venta.id} venta={venta} />
            ))}
          </div>

          <div>
            <p>Página {pagina}</p>

            <div>
              <button
                type="button"
                disabled={!hayAnterior || cargando}
                onClick={() => setPagina((prev) => Math.max(1, prev - 1))}
              >
                Anterior
              </button>

              <button
                type="button"
                disabled={!haySiguiente || cargando}
                onClick={() => setPagina((prev) => prev + 1)}
              >
                Siguiente
              </button>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
