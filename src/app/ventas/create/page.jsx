"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ventaSchema } from "@/schemas/ventaSchema";
import { crearVenta } from "@/lib/api";

export default function NuevaVentaPage() {
  const router = useRouter();
  const [errorAPI, setErrorAPI] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ventaSchema),
    defaultValues: {
      cliente: "",
      vendedor: "",
      metodo_pago: "",
      fecha: "",
    },
  });

  const onSubmit = async (data) => {
    setErrorAPI("");

    try {
      const venta = await crearVenta(data);
      // Se va al detalle de la venta nueva para cargarle los productos
      router.push(`/ventas/${venta.id}`);
    } catch (err) {
      setErrorAPI(err.message);
    }
  };

  return (
    <section>
      <Link href="/ventas">
        ← Volver a ventas
      </Link>

      <h2>Nueva venta</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* TODO: cliente, vendedor y método de pago pasan a ser <select> cuando
            se puedan listar desde la API (clientes y vendedores son solo staff
            y todavía no hay endpoint de métodos de pago). */}
        <div>
          <label htmlFor="cliente">
            Cliente (ID)
          </label>
          <input
            id="cliente"
            type="number"
            {...register("cliente")}
          />
          {errors.cliente && (
            <p>{errors.cliente.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="vendedor">
            Vendedor (ID)
          </label>
          <input
            id="vendedor"
            type="number"
            {...register("vendedor")}
          />
          {errors.vendedor && (
            <p>{errors.vendedor.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="metodo_pago">
            Método de pago (ID)
          </label>
          <input
            id="metodo_pago"
            type="number"
            {...register("metodo_pago")}
          />
          {errors.metodo_pago && (
            <p>{errors.metodo_pago.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="fecha">
            Fecha
          </label>
          <input
            id="fecha"
            type="date"
            {...register("fecha")}
          />
          {errors.fecha && (
            <p>{errors.fecha.message}</p>
          )}
        </div>

        {errorAPI && (
          <p role="alert">
            {errorAPI}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Guardando..." : "Crear venta"}
        </button>
      </form>
    </section>
  );
}
