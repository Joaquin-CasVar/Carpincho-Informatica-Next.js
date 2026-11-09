
import { z } from 'zod';

const salarioSchema = z.string()
  .trim()
  .regex(
    /^\d{1,8}(\.\d{1,2})?$/,
    'Ingresá un salario válido, con hasta 8 dígitos enteros y 2 decimales'
  );

export const crearVendedorSchema = z.object({
  persona_id: z.number()
    .int('El ID del usuario debe ser un número entero')
    .positive('El ID debe ser mayor a cero'),

  salario: salarioSchema,

  activo: z.boolean(),
});

export const editarVendedorSchema = z.object({
  salario: salarioSchema,
});
