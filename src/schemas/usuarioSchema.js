
import { z } from 'zod';

// Validaciones compartidas entre crear y editar usuarios
const datosUsuarioSchema = z.object({
  username: z.string()
    .trim()
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(150, 'El usuario no puede superar 150 caracteres'),

  first_name: z.string()
    .trim()
    .min(1, 'El nombre es obligatorio')
    .max(150, 'El nombre no puede superar 150 caracteres'),

  last_name: z.string()
    .trim()
    .min(1, 'El apellido es obligatorio')
    .max(150, 'El apellido no puede superar 150 caracteres'),

  email: z.email('Ingresá un email válido'),

  telefono: z.string()
    .trim()
    .max(30, 'El teléfono no puede superar 30 caracteres'),
});

// Esquema para crear usuarios
export const crearUsuarioSchema = datosUsuarioSchema
  .extend({
    password: z.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres'),

    password2: z.string()
      .min(1, 'Confirmá la contraseña'),
  })
  .refine(
    (datos) => datos.password === datos.password2,
    {
      message: 'Las contraseñas no coinciden',
      path: ['password2'],
    }
  );

// Esquema para editar usuarios
export const editarUsuarioSchema = datosUsuarioSchema.extend({
  activo: z.boolean(),
});
