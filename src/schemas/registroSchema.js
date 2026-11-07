
import { z } from 'zod';

export const registroSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, 'El usuario debe tener al menos 3 caracteres.')
      .max(150, 'El usuario es demasiado largo.'),

    first_name: z
      .string()
      .trim()
      .min(1, 'Ingresá tu nombre.'),

    last_name: z
      .string()
      .trim()
      .min(1, 'Ingresá tu apellido.'),

    email: z
      .email('Ingresá un correo electrónico válido.'),

    telefono: z
      .string()
      .trim()
      .max(30, 'El teléfono no puede superar los 30 caracteres.'),

    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres.'),

    password2: z
      .string()
      .min(1, 'Confirmá tu contraseña.'),
  })
  .refine(
    (datos) => datos.password === datos.password2,
    {
      message: 'Las contraseñas no coinciden.',
      path: ['password2'],
    }
  );
