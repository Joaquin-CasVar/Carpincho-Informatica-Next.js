"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import VentaDetail from "@/components/VentaDetail";
import Icon from "@/components/Icon";
import { detalleVentaSchema } from "@/schemas/ventaSchema";
import {
  borrarVenta,
  crearDetalle,
  editarDetalle,
  listarProductos,
  obtenerVenta,
} from "@/lib/api";

const VACIO = { producto: "", cantidad: 1 }; // formulario de detalle vacío

export default function VentaDetallePage({ params }) {
  // En un Client Component, params es una Promise y se lee con use()
  const { id } = use(params);
  const router = useRouter();

  const [venta, setVenta] = useState(null); // venta con sus detalles (de la API)
  const [productos, setProductos] = useState([]); // para el select y los nombres de la tabla
  const [cargando, setCargando] = useState(true);
  const [noEncontrada, setNoEncontrada] = useState(false);
  const [error, setError] = useState("");
  const [errorAPI, setErrorAPI] = useState("");
  const [mensaje, setMensaje] = useState("");
  // Se incrementa para volver a pedir la venta a la API después de guardar
  const [version, setVersion] = useState(0);
  const [detalleEnEdicion, setDetalleEnEdicion] = useState(null); // null = agregando, si no = editando ese detalle

  // Formulario del detalle: React Hook Form + validación con Zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(detalleVentaSchema),
    defaultValues: VACIO,
  });

  // Productos para el select y para mostrar sus nombres en la tabla
  useEffect(() => {
    let cancelado = false;

    async function cargarProductos() {
      try {
        const lista = await listarProductos();

        if (!cancelado) {
          setProductos(lista);
        }
      } catch {
        // si falla, la tabla muestra "Producto #id" y el select queda vacío
      }
    }

    cargarProductos();

    return () => {
      cancelado = true;
    };
  }, []);

  // Venta con sus detalles
  useEffect(() => {
    let cancelado = false;

    async function cargarVenta() {
      try {
        const data = await obtenerVenta(id);

        if (!cancelado) {
          setVenta(data);
          setError("");
        }
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
  }, [id, version]); // vuelve a pedir la venta cuando cambia "version"

  const handleEditar = (detalle) => {
    setMensaje("");
    setErrorAPI("");
    setDetalleEnEdicion(detalle);
    reset({ producto: detalle.producto, cantidad: detalle.cantidad }); // carga ese detalle en el formulario
  };

  const handleCancelar = () => {
    setDetalleEnEdicion(null);
    setErrorAPI("");
    reset(VACIO);
  };

  const onSubmit = async (data) => {
    setErrorAPI("");
    setMensaje("");

    try {
      if (detalleEnEdicion) { // editando → PATCH; agregando → POST
        await editarDetalle(detalleEnEdicion.id, { venta: venta.id, ...data });
      } else {
        await crearDetalle({ venta: venta.id, ...data });
      }

      setDetalleEnEdicion(null);
      reset(VACIO);
      setMensaje("Detalle guardado.");
      setVersion((v) => v + 1); // recarga la venta para ver el total nuevo
    } catch (err) {
      setErrorAPI(err.message);
    }
  };

  const handleBorrar = async () => {
    if (!confirm("¿Seguro que querés dar de baja esta venta?")) return; // si cancela, no hace nada

    setErrorAPI("");

    try {
      await borrarVenta(venta.id); // DELETE ventas/{id}/borrado_logico/
      router.push("/ventas");
    } catch (err) {
      setErrorAPI(err.message);
    }
  };

  if (noEncontrada) {
    notFound(); // muestra ventas/not-found.jsx
  }

  if (cargando) {
    return (
      <div className="flex flex-col gap-4">
        <div className="skeleton h-24" />
        <div className="skeleton h-56" />
      </div>
    );
  }

  if (error || !venta) {
    return (
      <p role="alert" className="alert-error">
        {error || "No se pudo cargar la venta"}
      </p>
    );
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/ventas" className="btn btn-ghost btn-sm">
          <Icon name="volver" className="size-4" />
          Volver a ventas
        </Link>

        <div className="flex gap-2">
          <Link href={`/ventas/${venta.id}/edit`} className="btn btn-secondary btn-sm">
            <Icon name="editar" className="size-4" />
            Editar venta
          </Link>
          <button
            type="button"
            onClick={handleBorrar}
            className="btn btn-danger btn-sm"
          >
            <Icon name="basura" className="size-4" />
            Dar de baja
          </button>
        </div>
      </div>

      <VentaDetail
        venta={venta}
        productos={productos}
        onEditarDetalle={handleEditar}
      />

      {mensaje && (
        <p role="status" className="alert-success">
          {mensaje}
        </p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="card flex flex-col gap-5 p-6"
      >
        <div>
          <h3 className="text-lg font-semibold">
            {detalleEnEdicion
              ? `Editar detalle #${detalleEnEdicion.id}`
              : "Agregar detalle"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Elegí un producto y la cantidad. El subtotal y el total se calculan solos.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_10rem]">
          <div>
            <label htmlFor="producto" className="label">
              Producto
            </label>
            <select id="producto" className="input" {...register("producto")}>
              <option value="">Seleccioná un producto</option>
              {productos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
            {errors.producto && (
              <p className="field-error">{errors.producto.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="cantidad" className="label">
              Cantidad
            </label>
            <input
              id="cantidad"
              type="number"
              className="input"
              {...register("cantidad")}
            />
            {errors.cantidad && (
              <p className="field-error">{errors.cantidad.message}</p>
            )}
          </div>
        </div>

        {errorAPI && (
          <p role="alert" className="alert-error">
            {errorAPI}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
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
              className="btn btn-secondary"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
