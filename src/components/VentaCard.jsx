import Link from "next/link";
import { formatearFecha, formatearPrecio } from "@/lib/formatters";

export default function VentaCard({ venta }) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border border-black/10 p-6 dark:border-white/20">
      <div>
        <h3 className="text-lg font-medium">Venta #{venta.id}</h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          Cliente #{venta.cliente} · {formatearFecha(venta.fecha)}
        </p>
        <p className="mt-2 text-xl font-semibold">
          {formatearPrecio(venta.total)}
        </p>
      </div>
      <Link
        href={`/ventas/${venta.id}`}
        className="text-sm font-medium text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400"
      >
        Ver detalle →
      </Link>
    </div>
  );
}
