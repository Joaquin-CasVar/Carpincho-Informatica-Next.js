import Link from "next/link";
import Icon from "@/components/Icon";
import { formatearFecha, formatearPrecio } from "@/lib/formatters";

// Tarjeta de una venta en el listado: toda la tarjeta es un link al detalle
export default function VentaCard({ venta }) {
  return (
    <Link
      href={`/ventas/${venta.id}`}
      className="group card card-hover flex flex-col justify-between gap-5 p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">Venta #{venta.id}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Cliente #{venta.cliente}
          </p>
        </div>
        <span className="badge">{formatearFecha(venta.fecha)}</span>
      </div>

      <div className="flex items-end justify-between gap-3">
        <p className="text-2xl font-semibold tracking-tight tabular-nums">
          {formatearPrecio(venta.total)}
        </p>
        <span className="flex items-center gap-1 text-sm font-medium text-primary">
          Ver detalle
          <Icon
            name="flecha"
            className="size-4 transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
