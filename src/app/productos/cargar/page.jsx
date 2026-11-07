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
    <div>
      <h1 className="text-9xl">Cargar Producto</h1>

      {loading &&
        <svg width="32" height="32" fill="currentColor" className="bi bi-circle-half animate-spin" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16" />
        </svg>
      }

      <ProductoForm form={prodForm} producto={producto} />
      {type === 1 && <CpuForm form={cpuForm} detalle={detalle} />}
      {type === 2 && <GpuForm form={gpuForm} detalle={detalle} />}

      <button type='button' onClick={onSubmit} className='bg-blue-500 text-white p-2 rounded-md'>Save</button>
    </div>
  )
}