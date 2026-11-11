import z from "zod";

export const cpuSchema = z.object({
    producto: z.int()
        .min(1, 'Debe pasar el id del producto'),
    arquitectura: z.int()
        .min(1, 'Debe seleccionar una arquitectura'),
    socket: z.int()
        .min(1, 'Debe seleccionar un socket'),
    cant_nucleos: z.number('Los nucleos son obligatorios')
        .int('Los nucleos deben ser un numero entero')
        .positive('Los nucleos deben ser un numero positivo'),
    velocidad_reloj: z.number('La frecuencia base es obligatoria')
        .positive('La frecuencia base debe ser un numero positivo')
        .multipleOf(.01, 'La frecuencia base debe tener 2 decimales'),
    velocidad_boost: z.number('La frecuencia boost es obligatoria')
        .positive('La frecuencia boost debe ser un numero positivo')
        .multipleOf(.01, 'La frecuencia boost debe tener 2 decimales'),
    cache: z.number('La caché es obligatoria')
        .int('La caché debe ser un numero entero')
        .positive('La caché debe ser un numero positivo'),
    tdp: z.number('El TDP es obligatorio')
        .int('El TDP debe ser un numero entero')
        .positive('El TDP debe ser un numero positivo'),
    graficos_integrados: z.boolean('Los graficos integrados deben ser Verdadero o Falso'),
    incluye_cooler: z.boolean('Incluye cooler debe ser Verdadero o Falso'),
})