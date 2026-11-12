import { describe, it, expect } from "vitest";
import { productoSchema } from "../validations/productoSchema";

describe("Pruebas para productoSchema", () => {

    it("Debe fallar si el nombre esta vacio", () => {
        const invalidData = {
            nombre: "",
            precio: 19.99,
            stock: 100,
            fabricante: 1,
            color: 1,
            tipo: 1,
        }

        const result = productoSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("El nombre es obligatorio")
        }
    })

    it("Debe fallar si el nombre supera los 150 caracteres", () => {
        const invalidData = {
            nombre: "A".repeat(151),
            precio: 19.99,
            stock: 100,
            fabricante: 1,
            color: 1,
            tipo: 1,
        }

        const result = productoSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("El nombre debe tener menos de 150 caracteres")
        }
    })

    it("Debe fallar si el precio esta vacio", () => {
        const invalidData = {
            nombre: "Valido",
            precio: "",
            stock: 100,
            fabricante: 1,
            color: 1,
            tipo: 1,
        }

        const result = productoSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("El precio es obligatorio")
        }
    })

    it("Debe fallar si el precio es 0", () => {
        const invalidData = {
            nombre: "Valido",
            precio: 0,
            stock: 100,
            fabricante: 1,
            color: 1,
            tipo: 1,
        }

        const result = productoSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("El precio debe ser un numero positivo")
        }
    })

    it("Debe fallar si el precio tiene mas de 2 decimales", () => {
        const invalidData = {
            nombre: "Valido",
            precio: 19.123,
            stock: 100,
            fabricante: 1,
            color: 1,
            tipo: 1,
        }

        const result = productoSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("El precio debe tener 2 decimales")
        }
    })

    it("Debe fallar si el stock esta vacio", () => {
        const invalidData = {
            nombre: "Valido",
            precio: 19.99,
            stock: "",
            fabricante: 1,
            color: 1,
            tipo: 1,
        }

        const result = productoSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("El stock es obligatorio")
        }
    })

    it("Debe fallar si el stock es un numero decimal", () => {
        const invalidData = {
            nombre: "Valido",
            precio: 19.99,
            stock: 100.1,
            fabricante: 1,
            color: 1,
            tipo: 1,
        }

        const result = productoSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("El stock debe ser un numero entero")
        }
    })

    it("Debe fallar si el stock es negativo", () => {
        const invalidData = {
            nombre: "Valido",
            precio: 19.99,
            stock: -1,
            fabricante: 1,
            color: 1,
            tipo: 1,
        }

        const result = productoSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("El stock debe ser un numero positivo ó 0")
        }
    })

    it("Debe fallar si no se selecciona un fabricante", () => {
        const invalidData = {
            nombre: "Valido",
            precio: 19.99,
            stock: 100,
            fabricante: 0,
            color: 1,
            tipo: 1,
        }

        const result = productoSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("Debe seleccionar un fabricante")
        }
    })

    it("Debe fallar si no se selecciona un color", () => {
        const invalidData = {
            nombre: "Valido",
            precio: 19.99,
            stock: 100,
            fabricante: 1,
            color: 0,
            tipo: 1,
        }

        const result = productoSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("Debe seleccionar un color")
        }
    })

    it("Debe fallar si no se selecciona un tipo de producto", () => {
        const invalidData = {
            nombre: "Valido",
            precio: 19.99,
            stock: 100,
            fabricante: 1,
            color: 1,
            tipo: 0,
        }

        const result = productoSchema.safeParse(invalidData)

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("Debe seleccionar un tipo de producto")
        }
    })

    it("Debe permitir cargar el producto sin el campo de imagen", () => {
        const invalidData = {
            nombre: "Valido",
            precio: 19.99,
            stock: 100,
            fabricante: 1,
            color: 1,
            tipo: 1,
        }

        const result = productoSchema.safeParse(invalidData)

        expect(result.success).toBe(true)
    })
})