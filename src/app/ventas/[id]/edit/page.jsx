"use client";

import { use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ventaSchema } from "@/validations/ventaSchema";
import { editarVenta } from "@/lib/ventasService";
import { aplicarErroresApi } from "@/lib/apiErrors";
import { ventasEjemplo } from "@/data/ventasEjemplo";
import {
  clientesEjemplo,
  vendedoresEjemplo,
  metodosPagoEjemplo,
} from "@/data/opcionesEjemplo";

const CAMPOS = ["cliente", "vendedor", "metodo_pago", "fecha"];
const inputClassName =
  "rounded-md border border-black/20 bg-background p-2 text-foreground dark:border-white/30";

export default function EditarVentaPage({ params }) {
  // En un Client Component, params es una Promise y se lee con use()
  const { id } = use(params);
  const router = useRouter();

  const venta = ventasEjemplo.find((v) => String(v.id) === id);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ventaSchema),
    defaultValues: {
      cliente: venta?.cliente ?? "",
      vendedor: venta?.vendedor ?? "",
      metodo_pago: venta?.metodo_pago ?? "",
      fecha: venta?.fecha ?? "",
    },
  });

  if (!venta) {
    notFound();
  }

  const onSubmit = async (data) => {
    try {
      await editarVenta(venta.id, data);
      router.push(`/ventas/${venta.id}`);
    } catch (error) {
      aplicarErroresApi(error.response?.data, setError, CAMPOS);
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <Link
        href={`/ventas/${venta.id}`}
        className="self-start text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400"
      >
        ← Volver a la venta
      </Link>

      <h2 className="text-2xl font-semibold">Editar venta #{venta.id}</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-xl flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="cliente" className="font-medium">
            Cliente
          </label>
          <select id="cliente" className={inputClassName} {...register("cliente")}>
            <option value="">Seleccioná un cliente</option>
            {clientesEjemplo.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
          {errors.cliente && (
            <p className="text-sm text-red-500">{errors.cliente.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="vendedor" className="font-medium">
            Vendedor
          </label>
          <select id="vendedor" className={inputClassName} {...register("vendedor")}>
            <option value="">Seleccioná un vendedor</option>
            {vendedoresEjemplo.map((v) => (
              <option key={v.id} value={v.id}>
                {v.nombre}
              </option>
            ))}
          </select>
          {errors.vendedor && (
            <p className="text-sm text-red-500">{errors.vendedor.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="metodo_pago" className="font-medium">
            Método de pago
          </label>
          <select
            id="metodo_pago"
            className={inputClassName}
            {...register("metodo_pago")}
          >
            <option value="">Seleccioná un método de pago</option>
            {metodosPagoEjemplo.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>
          {errors.metodo_pago && (
            <p className="text-sm text-red-500">{errors.metodo_pago.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="fecha" className="font-medium">
            Fecha
          </label>
          <input
            id="fecha"
            type="date"
            className={inputClassName}
            {...register("fecha")}
          />
          {errors.fecha && (
            <p className="text-sm text-red-500">{errors.fecha.message}</p>
          )}
        </div>

        {errors.root?.server && (
          <p className="text-sm text-red-500">{errors.root.server.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {isSubmitting ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </section>
  );
}
