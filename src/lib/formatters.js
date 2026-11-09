// La API devuelve los DecimalField como string (ej: "185000.00")
export function formatearPrecio(valor) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(Number(valor));
}

// La API devuelve las fechas como "YYYY-MM-DD"
export function formatearFecha(fecha) {
  const [anio, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${anio}`;
}
