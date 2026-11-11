import { formatearFecha, formatearPrecio } from "@/lib/formatters";

// productos: lista de la API para mostrar el nombre en vez del id.
// onEditarDetalle: si se pasa, cada fila muestra un botón "Editar".
export default function VentaDetail({ venta, productos = [], onEditarDetalle }) {
  const nombreProducto = (id) =>
    productos.find((p) => p.id === id)?.nombre ?? `Producto #${id}`;

  return (
    <div className="flex flex-col gap-6">
      <div className="card flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Venta #{venta.id}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Fecha: {formatearFecha(venta.fecha)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="badge">Cliente #{venta.cliente}</span>
          <span className="badge">Vendedor #{venta.vendedor}</span>
          <span className="badge">Método de pago #{venta.metodo_pago}</span>
        </div>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th className="text-right">Cantidad</th>
              <th className="text-right">Precio unitario</th>
              <th className="text-right">Subtotal</th>
              {onEditarDetalle && <th></th>}
            </tr>
          </thead>
          <tbody>
            {venta.detalles.map((detalle) => (
              <tr key={detalle.id}>
                <td className="font-medium">{nombreProducto(detalle.producto)}</td>
                <td className="text-right tabular-nums">{detalle.cantidad}</td>
                <td className="text-right tabular-nums">
                  {formatearPrecio(detalle.precio_unitario)}
                </td>
                <td className="text-right font-medium tabular-nums">
                  {formatearPrecio(detalle.subtotal)}
                </td>
                {onEditarDetalle && (
                  <td className="text-right">
                    <button
                      type="button"
                      onClick={() => onEditarDetalle(detalle)}
                      className="btn btn-ghost btn-sm"
                    >
                      Editar
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {venta.detalles.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">
            Esta venta todavía no tiene productos. Agregalos con el formulario
            de abajo.
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <p className="card flex items-baseline gap-3 px-6 py-4">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-2xl font-semibold tracking-tight tabular-nums">
            {formatearPrecio(venta.total)}
          </span>
        </p>
      </div>
    </div>
  );
}
