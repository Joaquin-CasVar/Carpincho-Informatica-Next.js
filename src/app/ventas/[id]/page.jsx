"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import VentaDetail from "@/components/VentaDetail";
import { detalleVentaSchema } from "@/schemas/ventaSchema";
import {
  borrarVenta,
  crearDetalle,
  editarDetalle,
  listarProductos,
  obtenerVenta,
} from "@/lib/api";

const VACIO = { producto: "", cantidad: 1 };

export default function VentaDetallePage({ params }) {
  // En un Client Component, params es una Promise y se lee con use()
  const { id } = use(params);
  const router = useRouter();

  const [venta, setVenta] = useState(null);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [noEncontrada, setNoEncontrada] = useState(false);
  const [error, setError] = useState("");
  const [errorAPI, setErrorAPI] = useState("");
  const [mensaje, setMensaje] = useState("");
  // Se incrementa para volver a pedir la venta a la API después de guardar
  const [version, setVersion] = useState(0);
  const [detalleEnEdicion, setDetalleEnEdicion] = useState(null);

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
  }, [id, version]);

  const handleEditar = (detalle) => {
    setMensaje("");
    setErrorAPI("");
    setDetalleEnEdicion(detalle);
    reset({ producto: detalle.producto, cantidad: detalle.cantidad });
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
      if (detalleEnEdicion) {
        await editarDetalle(detalleEnEdicion.id, { venta: venta.id, ...data });
      } else {
        await crearDetalle({ venta: venta.id, ...data });
      }

      setDetalleEnEdicion(null);
      reset(VACIO);
      setMensaje("Detalle guardado.");
      setVersion((v) => v + 1);
    } catch (err) {
      setErrorAPI(err.message);
    }
  };

  const handleBorrar = async () => {
    if (!confirm("¿Seguro que querés dar de baja esta venta?")) return;

    setErrorAPI("");

    try {
      await borrarVenta(venta.id);
      router.push("/ventas");
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

  if (error || !venta) {
    return (
      <p role="alert">
        {error || "No se pudo cargar la venta"}
      </p>
    );
  }

  return (
    <section>
      <div>
        <Link href="/ventas">
          ← Volver a ventas
        </Link>

        <div>
          <Link href={`/ventas/${venta.id}/edit`}>
            Editar venta
          </Link>
          <button
            type="button"
            onClick={handleBorrar}
          >
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
        <p role="status">
          {mensaje}
        </p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h3>
          {detalleEnEdicion
            ? `Editar detalle #${detalleEnEdicion.id}`
            : "Agregar detalle"}
        </h3>

        <div>
          <label htmlFor="producto">
            Producto
          </label>
          <select id="producto" {...register("producto")}>
            <option value="">Seleccioná un producto</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
          {errors.producto && (
            <p>{errors.producto.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="cantidad">
            Cantidad
          </label>
          <input
            id="cantidad"
            type="number"
            {...register("cantidad")}
          />
          {errors.cantidad && (
            <p>{errors.cantidad.message}</p>
          )}
        </div>

        {errorAPI && (
          <p role="alert">
            {errorAPI}
          </p>
        )}

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
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
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
