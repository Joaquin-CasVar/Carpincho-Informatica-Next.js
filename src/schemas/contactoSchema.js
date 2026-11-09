
import { z } from 'zod';

export const contactoSchema = z.object({
  nombre: z.string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede superar 100 caracteres'),

  email: z.email('Ingresá un correo electrónico válido'),

  asunto: z.string()
    .trim()
    .min(3, 'El asunto debe tener al menos 3 caracteres')
    .max(150, 'El asunto no puede superar 150 caracteres'),

  mensaje: z.string()
    .trim()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede superar 1000 caracteres'),
});
