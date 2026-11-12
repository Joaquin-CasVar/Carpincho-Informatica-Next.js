"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import ProductoForm from "@/app/components/producto/forms/ProductoForm";
import CpuForm from "@/app/components/producto/forms/CpuForm";
import GpuForm from "@/app/components/producto/forms/GpuForm";

import { productoSchema } from "@/app/validations/productoSchema";
import { cpuSchema } from "@/app/validations/cpuSchema";
import { gpuSchema } from "@/app/validations/gpuSchema";

export default function page() {
  const producto = JSON.parse(sessionStorage.getItem('productosEditar'))
  const detalle = producto?.detalle_componente

  const [loading, setLoading] = useState(false)

  const router = useRouter();
  
  const prodForm = useForm({
    resolver: zodResolver(productoSchema),
    defaultValues: producto ? {
      "nombre": producto.nombre,
      "precio": producto.precio,
      "stock": producto.stock,
      "imagen": producto.imagen,
    } : {
      "fabricante": 0,
      "color": 0,
      "tipo": 0,
    }
  })

  const type = prodForm.watch('tipo')

  const cpuForm = useForm({
    resolver: zodResolver(cpuSchema),
    defaultValues: (detalle && type === 1) ? {
      'producto': detalle.producto,
      "cant_nucleos": detalle.cant_nucleos,
      "velocidad_reloj": detalle.velocidad_reloj,
      "velocidad_boost": detalle.velocidad_boost,
      "cache": detalle.cache,
      "tdp": detalle.tdp,
      "graficos_integrados": detalle.graficos_integrados,
      "incluye_cooler": detalle.incluye_cooler,
    } : {
      'producto': 0,
      "arquitectura": 0,
      "socket": 0,
    }
  })

  const gpuForm = useForm({
    resolver: zodResolver(gpuSchema),
    defaultValues: (detalle && type === 2) ? {
      'producto': detalle.producto,
      "memoria": detalle.memoria,
      "velocidad_reloj": detalle.velocidad_reloj,
      "velocidad_boost": detalle.velocidad_boost,
      "longitud": detalle.longitud,
      "tdp": detalle.tdp,
      "ancho_slots": detalle.ancho_slots,
    } : {
      'producto': 0,
      "tipo_memoria": 0,
      "chipset": 0,
      "refrigeracion": 0,
    }
  })


  const onSubmit = async () => {
    const token = sessionStorage.getItem('access')

    if (!token) router.push("/account/login")

    setLoading(true)

    const prodFormIsValid = await prodForm.trigger()

    let detailFormIsValid = true
    let detailFormData = {}
    let detailURL = ''

    if (type === 1) {
      detailFormIsValid = await cpuForm.trigger()
      detailFormData = cpuForm.getValues()
      detailURL = 'cpus'
    } else if (type === 2) {
      detailFormIsValid = await gpuForm.trigger()
      detailFormData = gpuForm.getValues()
      detailURL = 'gpus'
    }

    if (!prodFormIsValid || !detailFormIsValid) return;

    try {
      if (!producto) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}productos/`,
          prodForm.getValues(),
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        // Cargo el producto y obtengo el id para la relacion con el detalle
        detailFormData.producto = response.data.id
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}${detailURL}/`,
          detailFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
      } else {
        axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}productos/${producto.id}/`,
          prodForm.getValues(),
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}${detailURL}/${detalle.id}/`,
          detailFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        sessionStorage.removeItem('productosEditar')
      }
    } catch (error) {
      console.error(`Codigo de error: ${error.status}. ${error.response.data.detail}`)

    } finally {
      setLoading(false)
      router.push(`/productos/${detailFormData.producto}`)
    }
  }

  return (
    <div className="container-page flex flex-col gap-8 py-10">
      <div className="border-b border-border pb-6">
        <h1 className="page-title">Cargar producto</h1>
        <p className="page-subtitle">
          Completá los datos del producto. Si es un procesador o una placa de
          video, también sus especificaciones.
        </p>
      </div>

      <section className="card p-6 sm:p-8">
        <h2 className="mb-6 text-lg font-semibold">Datos del producto</h2>
        <ProductoForm form={prodForm} producto={producto} />
      </section>

      {(type === 1 || type === 2) && (
        <section className="card p-6 sm:p-8">
          <h2 className="mb-6 text-lg font-semibold">
            {type === 1 ? "Especificaciones del procesador" : "Especificaciones de la placa de video"}
          </h2>
          {type === 1 && <CpuForm form={cpuForm} detalle={detalle} />}
          {type === 2 && <GpuForm form={gpuForm} detalle={detalle} />}
        </section>
      )}

      <div className="flex items-center gap-3">
        <button type='button' onClick={onSubmit} disabled={loading} className='btn btn-primary btn-lg'>
          {loading ? "Guardando..." : "Guardar producto"}
        </button>
        {loading &&
          <span className="size-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        }
      </div>
    </div>
  )
}