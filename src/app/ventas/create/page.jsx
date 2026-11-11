"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ventaSchema } from "@/schemas/ventaSchema";
import { crearVenta } from "@/lib/api";
import Icon from "@/components/Icon";

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
    <section className="flex flex-col gap-6">
      <Link href="/ventas" className="btn btn-ghost btn-sm self-start">
        <Icon name="volver" className="size-4" />
        Volver a ventas
      </Link>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="card flex max-w-3xl flex-col gap-6 p-6 sm:p-8"
      >
        <div>
          <h2 className="text-xl font-semibold">Nueva venta</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Después de crearla vas a poder agregarle los productos.
          </p>
        </div>
        {/* TODO: cliente, vendedor y método de pago pasan a ser <select> cuando
          se puedan listar desde la API (clientes y vendedores son solo staff
          y todavía no hay endpoint de métodos de pago). */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="cliente" className="label">
              Cliente (ID)
            </label>
            <input
              id="cliente"
              type="number"
              className="input"
              {...register("cliente")}
            />
            {errors.cliente && (
              <p className="field-error">{errors.cliente.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="vendedor" className="label">
              Vendedor (ID)
            </label>
            <input
              id="vendedor"
              type="number"
              className="input"
              {...register("vendedor")}
            />
            {errors.vendedor && (
              <p className="field-error">{errors.vendedor.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="metodo_pago" className="label">
              Método de pago (ID)
            </label>
            <input
              id="metodo_pago"
              type="number"
              className="input"
              {...register("metodo_pago")}
            />
            {errors.metodo_pago && (
              <p className="field-error">{errors.metodo_pago.message}</p>
            )}
          </div>
        </div>

        <div className="sm:max-w-xs">
          <label htmlFor="fecha" className="label">
            Fecha
          </label>
          <input
            id="fecha"
            type="date"
            className="input"
            {...register("fecha")}
          />
          {errors.fecha && (
            <p className="field-error">{errors.fecha.message}</p>
          )}
        </div>

        {errorAPI && (
          <p role="alert" className="alert-error">
            {errorAPI}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary self-start"
        >
          {isSubmitting ? "Guardando..." : "Crear venta"}
        </button>
      </form>
    </section>
  );
}
