
import { z } from 'zod';

// Validaciones para crear clientes
export const crearClienteSchema = z.object({
  persona_id: z.number()
    .int('El ID del usuario debe ser un número entero')
    .positive('El ID del usuario debe ser mayor a cero'),

  direccion: z.string()
    .trim()
    .max(255, 'La dirección no puede superar 255 caracteres'),

  activo: z.boolean(),
});

// Validaciones para editar clientes
export const editarClienteSchema = z.object({
  direccion: z.string()
    .trim()
    .max(255, 'La dirección no puede superar 255 caracteres'),
});
