import { z } from "zod";

// Los <select> e <input> devuelven strings; z.coerce.number() los convierte a número.
// Un select vacío ("") se convierte en 0, que no pasa el .positive().
const idObligatorio = (mensaje) =>
  z.coerce
    .number({ error: mensaje })
    .int(mensaje)
    .positive(mensaje);

export const ventaSchema = z.object({
  cliente: idObligatorio("Seleccioná un cliente"),
  vendedor: idObligatorio("Seleccioná un vendedor"),
  metodo_pago: idObligatorio("Seleccioná un método de pago"),
  fecha: z
    .string()
    .min(1, "La fecha es obligatoria")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener formato AAAA-MM-DD"),
});

export const detalleVentaSchema = z.object({
  producto: idObligatorio("Seleccioná un producto"),
  cantidad: z.coerce
    .number({ error: "La cantidad es obligatoria" })
    .int("La cantidad debe ser un número entero")
    .min(1, "La cantidad mínima es 1")
    .max(999, "La cantidad máxima es 999"),
});
