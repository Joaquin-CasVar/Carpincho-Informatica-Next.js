'use client'

import { useEffect, useState } from "react"

import { getArquitecturas, getSockets } from "@/lib/api"

export default function CpuForm({ form, detalle }) {
  const [arquitecturas, setArquitecturas] = useState([])
  const [sockets, setSockets] = useState([])

  const { register, setValue, reset, formState: { errors } } = form

  useEffect(() => {
    const initializeForm = async () => {
      try {
        setArquitecturas(await getArquitecturas())
        setSockets(await getSockets())

        if (detalle) {
          reset(detalle)
          setValue("arquitectura", detalle.arquitectura.id);
          setValue("socket", detalle.socket.id);
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
          <p className='label'>Arquitectura<label className='ml-1 text-xs font-normal text-destructive'>{errors.arquitectura && "*" + errors.arquitectura.message}</label></p>
          <select
            className='input cursor-pointer'
            {...register("arquitectura", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar Arquitectura</option>

            {arquitecturas.map((arquitectura) => (
              <option key={arquitectura.id} value={arquitectura.id}>{arquitectura.nombre}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <p className='label'>Socket<label className='ml-1 text-xs font-normal text-destructive'>{errors.socket && "*" + errors.socket.message}</label></p>
          <select
            className='input cursor-pointer'
            {...register("socket", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar Socket</option>

            {sockets.map((socket) => (
              <option key={socket.id} value={socket.id}>{socket.nombre}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <p className='label'>N° de nucleos <label className='ml-1 text-xs font-normal text-destructive'>{errors.cant_nucleos && "*" + errors.cant_nucleos.message}</label></p>
          <input
            type="text"
            placeholder='Nucleos'
            className='input'
            {...register("cant_nucleos", { valueAsNumber: true })}
          />
        </div>

        <div className='flex flex-col'>
          <p className='label'>Frecuencia base <label className='ml-1 text-xs font-normal text-destructive'>{errors.velocidad_reloj && "*" + errors.velocidad_reloj.message}</label></p>
          <div className='input flex items-center gap-2 focus-within:border-primary focus-within:ring-3 focus-within:ring-ring/25'>
            <input
              type="text"
              placeholder='1.1'
              className='w-full min-w-0 bg-transparent outline-none'
              {...register("velocidad_reloj", { valueAsNumber: true })}
            />
            <span className='text-sm text-muted-foreground'>Ghz</span>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='label'>Frecuencia boost <label className='ml-1 text-xs font-normal text-destructive'>{errors.velocidad_boost && "*" + errors.velocidad_boost.message}</label></p>
          <div className='input flex items-center gap-2 focus-within:border-primary focus-within:ring-3 focus-within:ring-ring/25'>
            <input
              type="text"
              placeholder='1.1'
              className='w-full min-w-0 bg-transparent outline-none'
              {...register("velocidad_boost", { valueAsNumber: true })}
            />
            <span className='text-sm text-muted-foreground'>Ghz</span>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='label'>Caché <label className='ml-1 text-xs font-normal text-destructive'>{errors.cache && "*" + errors.cache.message}</label></p>
          <div className='input flex items-center gap-2 focus-within:border-primary focus-within:ring-3 focus-within:ring-ring/25'>
            <input
              type="text"
              placeholder='8'
              className='w-full min-w-0 bg-transparent outline-none'
              {...register("cache", { valueAsNumber: true })}
            />
            <span className='text-sm text-muted-foreground'>MB</span>
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
          <p className='label'>Graficos integrados <label className='ml-1 text-xs font-normal text-destructive'>{errors.graficos_integrados && "*" + errors.graficos_integrados.message}</label></p>
          <input
            type="checkbox"
            placeholder=''
            className='size-5 cursor-pointer accent-primary'
            {...register("graficos_integrados")}
          />
        </div>

        <div className='flex flex-col'>
          <p className='label'>Cooler incluido <label className='ml-1 text-xs font-normal text-destructive'>{errors.incluye_cooler && "*" + errors.incluye_cooler.message}</label></p>
          <input
            type="checkbox"
            placeholder=''
            className='size-5 cursor-pointer accent-primary'
            {...register("incluye_cooler")}
          />
        </div>

      </div>
    </form>
  )
}
