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
      <div className='mt-10 grid grid-cols-3 gap-3'>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Tipo de Memoria<label className='text-sm text-red-800 animate-pulse'>{errors.tipo_memoria && "*" + errors.tipo_memoria.message}</label></p>
          <select
            className='cursor-pointer p-2 border border-zinc-600 rounded-md my-4'
            {...register("tipo_memoria", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar tipo de memoria</option>

            {tiposMemoria.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>GPU (Chipset)<label className='text-sm text-red-800 animate-pulse'>{errors.chipset && "*" + errors.chipset.message}</label></p>
          <select
            className='cursor-pointer p-2 border border-zinc-600 rounded-md my-4'
            {...register("chipset", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar GPU (Chipset)</option>

            {chipsets.map((chipset) => (
              <option key={chipset.id} value={chipset.id}>{chipset.nombre}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Refrigeración<label className='text-sm text-red-800 animate-pulse'>{errors.refrigeracion && "*" + errors.refrigeracion.message}</label></p>
          <select
            className='cursor-pointer p-2 border border-zinc-600 rounded-md my-4'
            {...register("refrigeracion", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar Refrigeración</option>

            {refrigeraciones.map((refrigeracion) => (
              <option key={refrigeracion.id} value={refrigeracion.id}>{refrigeracion.nombre}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>GB de memoria <label className='text-sm text-red-800 animate-pulse'>{errors.memoria && "*" + errors.memoria.message}</label></p>
          <div className='p-2 border border-zinc-600 rounded-md my-4'>
            <input
              type="text"
              placeholder='Memoria'
              className=''
              {...register("memoria", { valueAsNumber: true })}
            />
            <span>GB</span>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Frecuencia base <label className='text-sm text-red-800 animate-pulse'>{errors.velocidad_reloj && "*" + errors.velocidad_reloj.message}</label></p>
          <div className='p-2 border border-zinc-600 rounded-md my-4'>
            <input
              type="text"
              placeholder='1010'
              className=''
              {...register("velocidad_reloj", { valueAsNumber: true })}
            />
            <span>Mhz</span>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Frecuencia boost <label className='text-sm text-red-800 animate-pulse'>{errors.velocidad_boost && "*" + errors.velocidad_boost.message}</label></p>
          <div className='p-2 border border-zinc-600 rounded-md my-4'>
            <input
              type="text"
              placeholder='1210'
              className=''
              {...register("velocidad_boost", { valueAsNumber: true })}
            />
            <span>Mhz</span>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Longitud <label className='text-sm text-red-800 animate-pulse'>{errors.longitud && "*" + errors.longitud.message}</label></p>
          <div className='p-2 border border-zinc-600 rounded-md my-4'>
            <input
              type="text"
              placeholder='100'
              className=''
              {...register("longitud", { valueAsNumber: true })}
            />
            <span>mm</span>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>TDP <label className='text-sm text-red-800 animate-pulse'>{errors.tdp && "*" + errors.tdp.message}</label></p>
          <div className='p-2 border border-zinc-600 rounded-md my-4'>
            <input
              type="text"
              placeholder='0'
              className=''
              {...register("tdp", { valueAsNumber: true })}
            />
            <span>W</span>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Slots que ocupa <label className='text-sm text-red-800 animate-pulse'>{errors.ancho_slots && "*" + errors.ancho_slots.message}</label></p>
          <input
            type="text"
            placeholder='1.1'
            className='p-2 border border-zinc-600 rounded-md my-4'
            {...register("ancho_slots", { valueAsNumber: true })}
          />
        </div>

      </div>
    </form>
  )
}
