import { formatearFecha, formatearPrecio } from "@/lib/formatters";
import { productosEjemplo } from "@/data/opcionesEjemplo";

const nombreProducto = (id) =>
  productosEjemplo.find((p) => p.id === id)?.nombre ?? `Producto #${id}`;

// Si se pasa onEditarDetalle, cada fila muestra un botón "Editar"
export default function VentaDetail({ venta, onEditarDetalle }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold">Venta #{venta.id}</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Fecha: {formatearFecha(venta.fecha)}
        </p>
        <p className="text-zinc-600 dark:text-zinc-400">
          Cliente #{venta.cliente} · Vendedor #{venta.vendedor} · Método de
          pago #{venta.metodo_pago}
        </p>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-black/10 dark:border-white/20">
            <th className="py-2">Producto</th>
            <th className="py-2">Cantidad</th>
            <th className="py-2">Precio unitario</th>
            <th className="py-2">Subtotal</th>
            {onEditarDetalle && <th className="py-2"></th>}
          </tr>
        </thead>
        <tbody>
          {venta.detalles.map((detalle) => (
            <tr
              key={detalle.id}
              className="border-b border-black/10 dark:border-white/20"
            >
              <td className="py-2">{nombreProducto(detalle.producto)}</td>
              <td className="py-2">{detalle.cantidad}</td>
              <td className="py-2">{formatearPrecio(detalle.precio_unitario)}</td>
              <td className="py-2">{formatearPrecio(detalle.subtotal)}</td>
              {onEditarDetalle && (
                <td className="py-2 text-right">
                  <button
                    type="button"
                    onClick={() => onEditarDetalle(detalle)}
                    className="text-sm font-medium text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400"
                  >
                    Editar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-right text-xl font-semibold">
        Total: {formatearPrecio(venta.total)}
      </p>
    </div>
  );
}
