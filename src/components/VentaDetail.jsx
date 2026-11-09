import { formatearFecha, formatearPrecio } from "@/lib/formatters";

// productos: lista de la API para mostrar el nombre en vez del id.
// onEditarDetalle: si se pasa, cada fila muestra un botón "Editar".
export default function VentaDetail({ venta, productos = [], onEditarDetalle }) {
  const nombreProducto = (id) =>
    productos.find((p) => p.id === id)?.nombre ?? `Producto #${id}`;

  return (
    <div>
      <div>
        <h2>Venta #{venta.id}</h2>
        <p>
          Fecha: {formatearFecha(venta.fecha)}
        </p>
        <p>
          Cliente #{venta.cliente} · Vendedor #{venta.vendedor} · Método de
          pago #{venta.metodo_pago}
        </p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio unitario</th>
            <th>Subtotal</th>
            {onEditarDetalle && <th></th>}
          </tr>
        </thead>
        <tbody>
          {venta.detalles.map((detalle) => (
            <tr key={detalle.id}>
              <td>{nombreProducto(detalle.producto)}</td>
              <td>{detalle.cantidad}</td>
              <td>{formatearPrecio(detalle.precio_unitario)}</td>
              <td>{formatearPrecio(detalle.subtotal)}</td>
              {onEditarDetalle && (
                <td>
                  <button
                    type="button"
                    onClick={() => onEditarDetalle(detalle)}
                  >
                    Editar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Total: {formatearPrecio(venta.total)}
      </p>
    </div>
  );
}
