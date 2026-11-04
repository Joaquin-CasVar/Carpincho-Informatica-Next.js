"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import VentaDetail from "@/components/VentaDetail";
import { detalleVentaSchema } from "@/validations/ventaSchema";
import { crearDetalle, editarDetalle } from "@/lib/ventasService";
import { aplicarErroresApi } from "@/lib/apiErrors";
import { ventasEjemplo } from "@/data/ventasEjemplo";
import { productosEjemplo } from "@/data/opcionesEjemplo";

const CAMPOS = ["producto", "cantidad"];
const VACIO = { producto: "", cantidad: 1 };
const inputClassName =
  "rounded-md border border-black/20 bg-background p-2 text-foreground dark:border-white/30";

export default function VentaDetallePage({ params }) {
  // En un Client Component, params es una Promise y se lee con use()
  const { id } = use(params);

  const [detalleEnEdicion, setDetalleEnEdicion] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(detalleVentaSchema),
    defaultValues: VACIO,
  });

  const venta = ventasEjemplo.find((v) => String(v.id) === id);

  if (!venta) {
    notFound();
  }

  const handleEditar = (detalle) => {
    setMensaje("");
    setDetalleEnEdicion(detalle);
    reset({ producto: detalle.producto, cantidad: detalle.cantidad });
  };

  const handleCancelar = () => {
    setDetalleEnEdicion(null);
    reset(VACIO);
  };

  const onSubmit = async (data) => {
    try {
      if (detalleEnEdicion) {
        await editarDetalle(detalleEnEdicion.id, { venta: venta.id, ...data });
      } else {
        await crearDetalle({ venta: venta.id, ...data });
      }
      setDetalleEnEdicion(null);
      reset(VACIO);
      setMensaje("Detalle guardado (simulado: todavía no se envía a la API).");
    } catch (error) {
      aplicarErroresApi(error.response?.data, setError, CAMPOS);
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link
          href="/ventas"
          className="text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400"
        >
          ← Volver a ventas
        </Link>
        <Link
          href={`/ventas/${venta.id}/edit`}
          className="rounded-full bg-foreground px-5 py-2 font-medium text-background transition-opacity hover:opacity-80"
        >
          Editar venta
        </Link>
      </div>

      <VentaDetail venta={venta} onEditarDetalle={handleEditar} />

      {mensaje && <p className="text-sm text-green-600">{mensaje}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-xl flex-col gap-4 rounded-xl border border-black/10 p-6 dark:border-white/20"
      >
        <h3 className="text-lg font-medium">
          {detalleEnEdicion
            ? `Editar detalle #${detalleEnEdicion.id}`
            : "Agregar detalle"}
        </h3>

        <div className="flex flex-col gap-1">
          <label htmlFor="producto" className="font-medium">
            Producto
          </label>
          <select id="producto" className={inputClassName} {...register("producto")}>
            <option value="">Seleccioná un producto</option>
            {productosEjemplo.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
          {errors.producto && (
            <p className="text-sm text-red-500">{errors.producto.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="cantidad" className="font-medium">
            Cantidad
          </label>
          <input
            id="cantidad"
            type="number"
            className={inputClassName}
            {...register("cantidad")}
          />
          {errors.cantidad && (
            <p className="text-sm text-red-500">{errors.cantidad.message}</p>
          )}
        </div>

        {errors.root?.server && (
          <p className="text-sm text-red-500">{errors.root.server.message}</p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-foreground px-5 py-2 font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {isSubmitting
              ? "Guardando..."
              : detalleEnEdicion
                ? "Guardar cambios"
                : "Agregar detalle"}
          </button>
          {detalleEnEdicion && (
            <button
              type="button"
              onClick={handleCancelar}
              className="rounded-full border border-black/20 px-5 py-2 font-medium dark:border-white/30"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
