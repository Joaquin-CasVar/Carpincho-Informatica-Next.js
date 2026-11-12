'use client'

import { useEffect, useState } from "react"

import { getTipos_memoria, getChipsets_gpu, getRefrigeraciones } from "@/lib/api"

export default function GpuForm({ form, detalle }) {
  const [tiposMemoria, setTiposMemoria] = useState([])
  const [chipsets, setChipsets] = useState([])
  const [refrigeraciones, setRefrigeraciones] = useState([])

  const { register, setValue, reset, formState: { errors } } = form

  useEffect(() => {
    const initializeForm = async () => {
      try {
        setTiposMemoria(await getTipos_memoria())
        setChipsets(await getChipsets_gpu())
        setRefrigeraciones(await getRefrigeraciones())

        if (detalle) {
          reset(detalle)
          setValue("tipo_memoria", detalle.tipo_memoria.id);
          setValue("chipset", detalle.chipset.id);
          setValue("refrigeracion", detalle.refrigeracion.id);
        }
      } catch (error) {
        console.error("Error loading form data:", error);
      }
    };

    initializeForm();
  }, []);

  return (
    <form>
      <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>

        <div className='flex flex-col'>
          <p className='label'>Tipo de Memoria<label className='ml-1 text-xs font-normal text-destructive'>{errors.tipo_memoria && "*" + errors.tipo_memoria.message}</label></p>
          <select
            className='input cursor-pointer'
            {...register("tipo_memoria", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar tipo de memoria</option>

            {tiposMemoria.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <p className='label'>GPU (Chipset)<label className='ml-1 text-xs font-normal text-destructive'>{errors.chipset && "*" + errors.chipset.message}</label></p>
          <select
            className='input cursor-pointer'
            {...register("chipset", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar GPU (Chipset)</option>

            {chipsets.map((chipset) => (
              <option key={chipset.id} value={chipset.id}>{chipset.nombre}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <p className='label'>Refrigeración<label className='ml-1 text-xs font-normal text-destructive'>{errors.refrigeracion && "*" + errors.refrigeracion.message}</label></p>
          <select
            className='input cursor-pointer'
            {...register("refrigeracion", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar Refrigeración</option>

            {refrigeraciones.map((refrigeracion) => (
              <option key={refrigeracion.id} value={refrigeracion.id}>{refrigeracion.nombre}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <p className='label'>GB de memoria <label className='ml-1 text-xs font-normal text-destructive'>{errors.memoria && "*" + errors.memoria.message}</label></p>
          <div className='input flex items-center gap-2 focus-within:border-primary focus-within:ring-3 focus-within:ring-ring/25'>
            <input
              type="text"
              placeholder='Memoria'
              className='w-full min-w-0 bg-transparent outline-none'
              {...register("memoria", { valueAsNumber: true })}
            />
            <span className='text-sm text-muted-foreground'>GB</span>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='label'>Frecuencia base <label className='ml-1 text-xs font-normal text-destructive'>{errors.velocidad_reloj && "*" + errors.velocidad_reloj.message}</label></p>
          <div className='input flex items-center gap-2 focus-within:border-primary focus-within:ring-3 focus-within:ring-ring/25'>
            <input
              type="text"
              placeholder='1010'
              className='w-full min-w-0 bg-transparent outline-none'
              {...register("velocidad_reloj", { valueAsNumber: true })}
            />
            <span className='text-sm text-muted-foreground'>Mhz</span>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='label'>Frecuencia boost <label className='ml-1 text-xs font-normal text-destructive'>{errors.velocidad_boost && "*" + errors.velocidad_boost.message}</label></p>
          <div className='input flex items-center gap-2 focus-within:border-primary focus-within:ring-3 focus-within:ring-ring/25'>
            <input
              type="text"
              placeholder='1210'
              className='w-full min-w-0 bg-transparent outline-none'
              {...register("velocidad_boost", { valueAsNumber: true })}
            />
            <span className='text-sm text-muted-foreground'>Mhz</span>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='label'>Longitud <label className='ml-1 text-xs font-normal text-destructive'>{errors.longitud && "*" + errors.longitud.message}</label></p>
          <div className='input flex items-center gap-2 focus-within:border-primary focus-within:ring-3 focus-within:ring-ring/25'>
            <input
              type="text"
              placeholder='100'
              className='w-full min-w-0 bg-transparent outline-none'
              {...register("longitud", { valueAsNumber: true })}
            />
            <span className='text-sm text-muted-foreground'>mm</span>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='label'>TDP <label className='ml-1 text-xs font-normal text-destructive'>{errors.tdp && "*" + errors.tdp.message}</label></p>
          <div className='input flex items-center gap-2 focus-within:border-primary focus-within:ring-3 focus-within:ring-ring/25'>
            <input
              type="text"
              placeholder='0'
              className='w-full min-w-0 bg-transparent outline-none'
              {...register("tdp", { valueAsNumber: true })}
            />
            <span className='text-sm text-muted-foreground'>W</span>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='label'>Slots que ocupa <label className='ml-1 text-xs font-normal text-destructive'>{errors.ancho_slots && "*" + errors.ancho_slots.message}</label></p>
          <input
            type="text"
            placeholder='1.1'
            className='input'
            {...register("ancho_slots", { valueAsNumber: true })}
          />
        </div>

      </div>
    </form>
  )
}
