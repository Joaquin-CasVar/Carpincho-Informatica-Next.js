"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import VentaCard from "@/components/VentaCard";
import Icon from "@/components/Icon";
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
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="flex items-center gap-3 text-xl font-semibold">
          Listado de ventas
          {total !== null && <span className="badge">{total}</span>}
        </h2>
        <Link href="/ventas/create" className="btn btn-primary">
          <Icon name="mas" className="size-4" />
          Nueva venta
        </Link>
      </div>

      {error && (
        <p role="alert" className="alert-error">
          {error}
        </p>
      )}

      {cargando ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="skeleton h-40" />
          ))}
        </div>
      ) : !error && ventas.length === 0 ? (
        <div className="card flex flex-col items-center gap-3 px-6 py-16 text-center">
          <Icon name="recibo" className="size-10 text-muted-foreground" />
          <p className="font-medium">Todavía no hay ventas cargadas.</p>
          <Link href="/ventas/create" className="btn btn-primary btn-sm">
            Cargar la primera
          </Link>
        </div>
      ) : !error ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ventas.map((venta) => (
              <VentaCard key={venta.id} venta={venta} />
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">Página {pagina}</p>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={!hayAnterior || cargando}
                onClick={() => setPagina((prev) => Math.max(1, prev - 1))}
                className="btn btn-secondary btn-sm"
              >
                <Icon name="izquierda" className="size-4" />
                Anterior
              </button>

              <button
                type="button"
                disabled={!haySiguiente || cargando}
                onClick={() => setPagina((prev) => prev + 1)}
                className="btn btn-secondary btn-sm"
              >
                Siguiente
                <Icon name="derecha" className="size-4" />
              </button>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
