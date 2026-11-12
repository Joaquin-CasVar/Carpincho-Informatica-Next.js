import { describe, it, expect } from "vitest";
import { cpuSchema } from "../validations/cpuSchema";

describe("Pruebas para cpuSchema", () => {

    it("Debe fallar si no se selecciona una arquitectura", () => {
        const invalidData = {
            producto: 1,
            arquitectura: 0,
            socket: 1,
            cant_nucleos: 1,
            velocidad_reloj: 1,
            velocidad_boost: 1,
            cache: 1,
            tdp: 1,
            graficos_integrados: true,
            incluye_cooler: true,
        }

        const result = cpuSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("Debe seleccionar una arquitectura")
        }
    })

    it("Debe fallar si no se selecciona un socket", () => {
        const invalidData = {
            producto: 1,
            arquitectura: 1,
            socket: 0,
            cant_nucleos: 1,
            velocidad_reloj: 1,
            velocidad_boost: 1,
            cache: 1,
            tdp: 1,
            graficos_integrados: true,
            incluye_cooler: true,
        }

        const result = cpuSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("Debe seleccionar un socket")
        }
    })

    it("Debe fallar si cantidad de nucleos esta vacio", () => {
        const invalidData = {
            producto: 1,
            arquitectura: 1,
            socket: 1,
            cant_nucleos: '',
            velocidad_reloj: 1,
            velocidad_boost: 1,
            cache: 1,
            tdp: 1,
            graficos_integrados: true,
            incluye_cooler: true,
        }

        const result = cpuSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("Los nucleos son obligatorios")
        }
    })

    it("Debe fallar si cantidad de nucleos no es entero", () => {
        const invalidData = {
            producto: 1,
            arquitectura: 1,
            socket: 1,
            cant_nucleos: 1.1,
            velocidad_reloj: 1,
            velocidad_boost: 1,
            cache: 1,
            tdp: 1,
            graficos_integrados: true,
            incluye_cooler: true,
        }

        const result = cpuSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("Los nucleos deben ser un numero entero")
        }
    })

    it("Debe fallar si cantidad de nucleos no es positivo", () => {
        const invalidData = {
            producto: 1,
            arquitectura: 1,
            socket: 1,
            cant_nucleos: -1,
            velocidad_reloj: 1,
            velocidad_boost: 1,
            cache: 1,
            tdp: 1,
            graficos_integrados: true,
            incluye_cooler: true,
        }

        const result = cpuSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("Los nucleos deben ser un numero positivo")
        }
    })

    it("Debe fallar si frecuencia base esta vacia", () => {
        const invalidData = {
            producto: 1,
            arquitectura: 1,
            socket: 1,
            cant_nucleos: 1,
            velocidad_reloj: '',
            velocidad_boost: 1,
            cache: 1,
            tdp: 1,
            graficos_integrados: true,
            incluye_cooler: true,
        }

        const result = cpuSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("La frecuencia base es obligatoria")
        }
    })

    it("Debe fallar si frecuencia base no es positiva", () => {
        const invalidData = {
            producto: 1,
            arquitectura: 1,
            socket: 1,
            cant_nucleos: 1,
            velocidad_reloj: -1,
            velocidad_boost: 1,
            cache: 1,
            tdp: 1,
            graficos_integrados: true,
            incluye_cooler: true,
        }

        const result = cpuSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("La frecuencia base debe ser un numero positivo")
        }
    })

    it("Debe fallar si frecuencia base tiene mas de 2 decimales", () => {
        const invalidData = {
            producto: 1,
            arquitectura: 1,
            socket: 1,
            cant_nucleos: 1,
            velocidad_reloj: 1.123,
            velocidad_boost: 1,
            cache: 1,
            tdp: 1,
            graficos_integrados: true,
            incluye_cooler: true,
        }

        const result = cpuSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("La frecuencia base debe tener 2 decimales")
        }
    })

    it("Debe fallar si frecuencia boost esta vacia", () => {
        const invalidData = {
            producto: 1,
            arquitectura: 1,
            socket: 1,
            cant_nucleos: 1,
            velocidad_reloj: 1,
            velocidad_boost: '',
            cache: 1,
            tdp: 1,
            graficos_integrados: true,
            incluye_cooler: true,
        }

        const result = cpuSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("La frecuencia boost es obligatoria")
        }
    })

    it("Debe fallar si frecuencia boost no es positiva", () => {
        const invalidData = {
            producto: 1,
            arquitectura: 1,
            socket: 1,
            cant_nucleos: 1,
            velocidad_reloj: 1,
            velocidad_boost: -1,
            cache: 1,
            tdp: 1,
            graficos_integrados: true,
            incluye_cooler: true,
        }

        const result = cpuSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("La frecuencia boost debe ser un numero positivo")
        }
    })

    it("Debe fallar si frecuencia boost tiene mas de 2 decimales", () => {
        const invalidData = {
            producto: 1,
            arquitectura: 1,
            socket: 1,
            cant_nucleos: 1,
            velocidad_reloj: 1,
            velocidad_boost: 1.123,
            cache: 1,
            tdp: 1,
            graficos_integrados: true,
            incluye_cooler: true,
        }

        const result = cpuSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("La frecuencia boost debe tener 2 decimales")
        }
    })

    it("Debe fallar si la cache esta vacia", () => {
        const invalidData = {
            producto: 1,
            arquitectura: 1,
            socket: 1,
            cant_nucleos: 1,
            velocidad_reloj: 1,
            velocidad_boost: 1,
            cache: '',
            tdp: 1,
            graficos_integrados: true,
            incluye_cooler: true,
        }

        const result = cpuSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("La caché es obligatoria")
        }
    })

    it("Debe fallar si la cache es un numero decimal", () => {
        const invalidData = {
            producto: 1,
            arquitectura: 1,
            socket: 1,
            cant_nucleos: 1,
            velocidad_reloj: 1,
            velocidad_boost: 1,
            cache: 1.1,
            tdp: 1,
            graficos_integrados: true,
            incluye_cooler: true,
        }

        const result = cpuSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("La caché debe ser un numero entero")
        }
    })

    it("Debe fallar si la cache no es positiva", () => {
        const invalidData = {
            producto: 1,
            arquitectura: 1,
            socket: 1,
            cant_nucleos: 1,
            velocidad_reloj: 1,
            velocidad_boost: 1,
            cache: 0,
            tdp: 1,
            graficos_integrados: true,
            incluye_cooler: true,
        }

        const result = cpuSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("La caché debe ser un numero positivo")
        }
    })

    it("Debe fallar si el TDP esta vacio", () => {
        const invalidData = {
            producto: 1,
            arquitectura: 1,
            socket: 1,
            cant_nucleos: 1,
            velocidad_reloj: 1,
            velocidad_boost: 1,
            cache: 1,
            tdp: '',
            graficos_integrados: true,
            incluye_cooler: true,
        }

        const result = cpuSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("El TDP es obligatorio")
        }
    })

    it("Debe fallar si el TDP es un numero decimal", () => {
        const invalidData = {
            producto: 1,
            arquitectura: 1,
            socket: 1,
            cant_nucleos: 1,
            velocidad_reloj: 1,
            velocidad_boost: 1,
            cache: 1,
            tdp: 1.2,
            graficos_integrados: true,
            incluye_cooler: true,
        }

        const result = cpuSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("El TDP debe ser un numero entero")
        }
    })

    it("Debe fallar si el TDP no es positivo", () => {
        const invalidData = {
            producto: 1,
            arquitectura: 1,
            socket: 1,
            cant_nucleos: 1,
            velocidad_reloj: 1,
            velocidad_boost: 1,
            cache: 1,
            tdp: -1,
            graficos_integrados: true,
            incluye_cooler: true,
        }

        const result = cpuSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("El TDP debe ser un numero positivo")
        }
    })

    it("Debe permitir cargar la CPU si los datos son validos", () => {
        const validData = {
            producto: 1,
            arquitectura: 1,
            socket: 1,
            cant_nucleos: 1,
            velocidad_reloj: 1,
            velocidad_boost: 1,
            cache: 1,
            tdp: 1,
            graficos_integrados: true,
            incluye_cooler: true,
        }

        const result = cpuSchema.safeParse(validData)

        expect(result.success).toBe(true)
    })
})