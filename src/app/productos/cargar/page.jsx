"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ProductoForm from "@/app/components/producto/forms/ProductoForm";
import CpuForm from "@/app/components/producto/forms/CpuForm";
import GpuForm from "@/app/components/producto/forms/GpuForm";
import { productoSchema } from "@/app/validations/productoSchema";
import { cpuSchema } from "@/app/validations/cpuSchema";
import { gpuSchema } from "@/app/validations/gpuSchema";

export default function page() {
  const producto = JSON.parse(sessionStorage.getItem('productosEditar'))
  const detalle = producto?.detalle_componente
  sessionStorage.removeItem('productosEditar')

  const prodForm = useForm({
    resolver: zodResolver(productoSchema),
    defaultValues: producto ? {
      "nombre": producto.nombre,
      "precio": producto.precio,
      "stock": producto.stock,
      "fabricanteId": producto.fabricante.id,
      "colorId": producto.color.id,
      "tipoId": producto.tipo.id,
      "imagen": producto.imagen,
    } : {
      "fabricanteId": 0,
      "colorId": 0,
      "tipoId": 0,
    }
  })

  const type = prodForm.watch('tipoId')

  const cpuForm = useForm({
    resolver: zodResolver(cpuSchema),
    defaultValues: (detalle && type === 1) ? {
      "arquitecturaId": detalle.arquitectura.id,
      "socketId": detalle.socket.id,
      "cant_nucleos": detalle.cant_nucleos,
      "velocidad_reloj": detalle.velocidad_reloj,
      "velocidad_boost": detalle.velocidad_boost,
      "cache": detalle.cache,
      "tdp": detalle.tdp,
      "graficos_integrados": detalle.graficos_integrados,
      "incluye_cooler": detalle.incluye_cooler,
    } : {
      "arquitecturaId": 0,
      "socketId": 0,
    }
  })

  const gpuForm = useForm({
    resolver: zodResolver(gpuSchema),
    defaultValues: (detalle && type === 2) ? {
      "memoriaId": detalle.memoria.id,
      "chipsetId": detalle.chipset.id,
      "refrigeracionId": detalle.refrigeracion.id,
      "memoria": detalle.memoria,
      "velocidad_reloj": detalle.velocidad_reloj,
      "velocidad_boost": detalle.velocidad_boost,
      "longitud": detalle.longitud,
      "tdp": detalle.tdp,
      "ancho_slots": detalle.ancho_slots,
    } : {
      "memoriaId": 0,
      "chipsetId": 0,
      "refrigeracionId": 0,
    }
  })


  const onSubmit = async () => {
    const prodFormIsValid = await prodForm.trigger()

    let detailFormIsValid = true
    let detailFormData = {}

    if (type === 1) {
      detailFormIsValid = await cpuForm.trigger()
      detailFormData = cpuForm.getValues()
    } else if (type === 2) {
      detailFormIsValid = await gpuForm.trigger()
      detailFormData = gpuForm.getValues()
    }

    if (!prodFormIsValid || !detailFormIsValid) return;

    console.log(prodForm.getValues());
    console.log(detailFormData);
  }

  return (
    <div>
      <h1 className="text-9xl">Cargar Producto</h1>


      <ProductoForm form={prodForm} />
      {type === 1 && <CpuForm form={cpuForm} />}
      {type === 2 && <GpuForm form={gpuForm} />}

      <button type='button' onClick={onSubmit} className='bg-blue-500 text-white p-2 rounded-md'>Save</button>
    </div>
  )
}