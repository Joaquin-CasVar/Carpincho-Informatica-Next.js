import z from "zod";

export const productoSchema = z.object({
    nombre: z.string()
        .min(1, 'El nombre es obligatorio')
        .max(150, 'El nombre debe tener menos de 150 caracteres'),
    precio: z.number('El precio es obligatorio')
        .positive('El precio debe ser un numero positivo')
        .multipleOf(.01, 'El precio debe tener 2 decimales'),
    stock: z.number('El stock es obligatorio')
        .int('El stock debe ser un numero entero')
        .nonnegative('El stock debe ser un numero positivo ó 0'),
    fabricante: z.int()
        .min(1, 'Debe seleccionar un fabricante'),
    color: z.int()
        .min(1, 'Debe seleccionar un color'),
    tipo: z.int()
        .min(1, 'Debe seleccionar un tipo de producto'),
})