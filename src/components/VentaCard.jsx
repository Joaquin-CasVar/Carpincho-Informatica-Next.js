import Link from "next/link";
import { formatearFecha, formatearPrecio } from "@/lib/formatters";

export default function VentaCard({ venta }) {
  return (
    <div>
      <div>
        <h3>Venta #{venta.id}</h3>
        <p>
          Cliente #{venta.cliente} · {formatearFecha(venta.fecha)}
        </p>
        <p>
          {formatearPrecio(venta.total)}
        </p>
      </div>
      <Link href={`/ventas/${venta.id}`}>
        Ver detalle →
      </Link>
    </div>
  );
}
