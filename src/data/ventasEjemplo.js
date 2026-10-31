// Datos de ejemplo con la misma forma que devuelve VentaListSerializer del Back.
// Se reemplazan por llamadas a la API cuando esté el login y el cliente de API.
export const ventasEjemplo = [
  {
    id: 1,
    cliente: 1,
    vendedor: 1,
    metodo_pago: 1,
    fecha: "2026-10-28",
    total: "685000.00",
    momento_carga: "2026-10-28T14:32:10Z",
    detalles: [
      {
        id: 1,
        venta: 1,
        producto: 3,
        cantidad: 1,
        precio_unitario: "485000.00",
        subtotal: "485000.00",
      },
      {
        id: 2,
        venta: 1,
        producto: 7,
        cantidad: 2,
        precio_unitario: "100000.00",
        subtotal: "200000.00",
      },
    ],
  },
  {
    id: 2,
    cliente: 2,
    vendedor: 1,
    metodo_pago: 2,
    fecha: "2026-10-29",
    total: "129000.00",
    momento_carga: "2026-10-29T10:05:44Z",
    detalles: [
      {
        id: 3,
        venta: 2,
        producto: 5,
        cantidad: 1,
        precio_unitario: "129000.00",
        subtotal: "129000.00",
      },
    ],
  },
  {
    id: 3,
    cliente: 1,
    vendedor: 2,
    metodo_pago: 1,
    fecha: "2026-10-30",
    total: "420000.00",
    momento_carga: "2026-10-30T18:21:03Z",
    detalles: [
      {
        id: 4,
        venta: 3,
        producto: 2,
        cantidad: 3,
        precio_unitario: "140000.00",
        subtotal: "420000.00",
      },
    ],
  },
];
