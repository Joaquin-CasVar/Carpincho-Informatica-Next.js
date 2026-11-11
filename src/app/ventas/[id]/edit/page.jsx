"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ventaSchema } from "@/schemas/ventaSchema";
import { editarVenta, obtenerVenta } from "@/lib/api";
import Icon from "@/components/Icon";

export default function EditarVentaPage({ params }) {
  // En un Client Component, params es una Promise y se lee con use()
  const { id } = use(params);
  const router = useRouter();

  const [cargando, setCargando] = useState(true);
  const [noEncontrada, setNoEncontrada] = useState(false);
  const [error, setError] = useState("");
  const [errorAPI, setErrorAPI] = useState("");

  // Formulario de la venta (mismas reglas que al crear: ventaSchema)
  const {
    register,
    handleSubmit,
    reset,
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

  // Trae la venta de la API y completa el formulario con sus datos
  useEffect(() => {
    let cancelado = false;

    async function cargarVenta() {
      try {
        const venta = await obtenerVenta(id);

        if (cancelado) return;

        // Completa el formulario con los datos actuales de la venta
        reset({
          cliente: venta.cliente,
          vendedor: venta.vendedor,
          metodo_pago: venta.metodo_pago,
          fecha: venta.fecha,
        });
      } catch (err) {
        if (cancelado) return;

        if (err.status === 404) {
          setNoEncontrada(true);
        } else {
          setError(err.message);
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    }

    cargarVenta();

    return () => {
      cancelado = true;
    };
  }, [id, reset]);

  const onSubmit = async (data) => {
    setErrorAPI("");

    try {
      await editarVenta(id, data); // PATCH ventas/{id}/
      router.push(`/ventas/${id}`); // vuelve al detalle
    } catch (err) {
      setErrorAPI(err.message);
    }
  };

  if (noEncontrada) {
    notFound(); // muestra ventas/not-found.jsx
  }

  if (cargando) {
    return <div className="skeleton h-80 max-w-3xl" />;
  }

  if (error) {
    return (
      <p role="alert" className="alert-error">
        {error}
      </p>
    );
  }

  return (
    <section className="flex flex-col gap-6">
      <Link href={`/ventas/${id}`} className="btn btn-ghost btn-sm self-start">
        <Icon name="volver" className="size-4" />
        Volver a la venta
      </Link>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="card flex max-w-3xl flex-col gap-6 p-6 sm:p-8"
      >
        <div>
          <h2 className="text-xl font-semibold">Editar venta #{id}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Cambiá los datos de la venta y guardá.
          </p>
        </div>
        {/* TODO: select de clientes, vendedores y métodos de pago (ver create) */}
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
          {isSubmitting ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </section>
  );
}
