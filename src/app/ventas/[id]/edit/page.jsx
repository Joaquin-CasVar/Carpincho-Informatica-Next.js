"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ventaSchema } from "@/schemas/ventaSchema";
import { editarVenta, obtenerVenta } from "@/lib/api";

export default function EditarVentaPage({ params }) {
  // En un Client Component, params es una Promise y se lee con use()
  const { id } = use(params);
  const router = useRouter();

  const [cargando, setCargando] = useState(true);
  const [noEncontrada, setNoEncontrada] = useState(false);
  const [error, setError] = useState("");
  const [errorAPI, setErrorAPI] = useState("");

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
      await editarVenta(id, data);
      router.push(`/ventas/${id}`);
    } catch (err) {
      setErrorAPI(err.message);
    }
  };

  if (noEncontrada) {
    notFound();
  }

  if (cargando) {
    return <p>Cargando venta...</p>;
  }

  if (error) {
    return (
      <p role="alert">
        {error}
      </p>
    );
  }

  return (
    <section>
      <Link href={`/ventas/${id}`}>
        ← Volver a la venta
      </Link>

      <h2>Editar venta #{id}</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* TODO: select de clientes, vendedores y métodos de pago (ver create) */}
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
          {isSubmitting ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </section>
  );
}
