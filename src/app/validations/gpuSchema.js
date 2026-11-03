import z from "zod";

export const gpuSchema = z.object({
    memoriaId: z.int()
        .min(1, 'Debe seleccionar un tipo de memoria'),
    chipsetId: z.int()
        .min(1, 'Debe seleccionar una GPU (chipset)'),
    refrigeracionId: z.int()
        .min(1, 'Debe seleccionar un tipo de refrigeración'),
    memoria: z.number('La memoria es obligatoria')
        .int('La memoria debe ser un numero entero')
        .positive('La memoria debe ser un numero positivo'),
    velocidad_reloj: z.number('La frecuencia base es obligatoria')
        .int('La frecuencia base debe ser un numero entero')
        .positive('La frecuencia base debe ser un numero positivo'),
    velocidad_boost: z.number('La frecuencia boost es obligatoria')
        .int('La frecuencia boost debe ser un numero entero')
        .positive('La frecuencia boost debe ser un numero positivo'),
    longitud: z.number('La longitud es obligatoria')
        .int('La longitud debe ser un numero entero')
        .positive('La longitud debe ser un numero positivo'),
    tdp: z.number('El TDP es obligatorio')
        .int('El TDP debe ser un numero entero')
        .positive('El TDP debe ser un numero positivo'),
    ancho_slots: z.number('El ancho es obligatorio')
        .positive('El ancho debe ser un numero positivo')
        .multipleOf(.01, 'El ancho debe tener 2 decimales'),
})