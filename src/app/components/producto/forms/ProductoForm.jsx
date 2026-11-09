'use client'

import { useEffect, useState } from "react"

import { getFabricantes, getColores, getTipos_producto } from "@/lib/api"

export default function ProductoForm({ form, producto }) {
  const [fabricantes, setFabricantes] = useState([])
  const [colores, setColores] = useState([])
  const [tipos, setTipos] = useState([])

  const { register, setValue, formState: { errors } } = form

  useEffect(() => {
    const initializeForm = async () => {
      try {
        setFabricantes(await getFabricantes());
        setColores(await getColores());
        setTipos(await getTipos_producto());

        if (producto) {
          setValue("fabricante", producto.fabricante.id);
          setValue("color", producto.color.id);
          setValue("tipo", producto.tipo.id);
        }
      } catch (error) {
        console.error("Error loading form data:", error);
      }
    };

    initializeForm();
  }, []);

  return (

    <form >
      <div className='mt-10 grid grid-cols-3 gap-3'>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Nombre <label className='text-sm text-red-800 animate-pulse'>{errors.nombre && "*" + errors.nombre.message}</label></p>
          <input
            type="text"
            placeholder='Nombre'
            className='p-2 border border-zinc-600 rounded-md my-4'
            {...register("nombre")}
          />
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Precio <label className='text-sm text-red-800 animate-pulse'>{errors.precio && "*" + errors.precio.message}</label></p>
          <div className='p-2 border border-zinc-600 rounded-md my-4'>
            <span>$</span>
            <input
              type="number"
              placeholder='0.00'
              className=""
              {...register("precio", { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <p className='text-zinc-400 text-lg'>Stock <label className='text-sm text-red-800 animate-pulse'>{errors.stock && "*" + errors.stock.message}</label></p>

          <input
            type="number"
            placeholder="0"
            className='p-2 border border-zinc-600 rounded-md my-4'
            {...register('stock', { valueAsNumber: true })}
          />
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Fabricante <label className='text-sm text-red-800 animate-pulse'>{errors.fabricante && "*" + errors.fabricante.message}</label></p>
          <select
            className='cursor-pointer p-2 border border-zinc-600 rounded-md my-4'
            {...register("fabricante", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar Fabricante</option>

            {fabricantes.map((fabricante) => (
              <option key={fabricante.id} value={fabricante.id}>{fabricante.nombre}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Color <label className='text-sm text-red-800 animate-pulse'>{errors.color && "*" + errors.color.message}</label></p>
          <select
            className='cursor-pointer p-2 border border-zinc-600 rounded-md my-4'
            {...register("color", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar Color</option>

            {colores.map((color) => (
              <option key={color.id} value={color.id}>{color.nombre}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Tipo <label className='text-sm text-red-800 animate-pulse'>{errors.tipo && "*" + errors.tipo.message}</label></p>
          <select
            className='cursor-pointer p-2 border border-zinc-600 rounded-md my-4'
            {...register("tipo", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar Tipo</option>

            {tipos.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>{tipo.tipo}</option>
            ))}
          </select>

          <div className='flex flex-col'>
            <p className='text-zinc-400 text-lg'>Imagen <label className='text-sm text-red-800 animate-pulse'>{errors.imagen && "*" + errors.imagen.message}</label></p>
            <input
              type="text"
              placeholder='https://link/de/la/imagen.com'
              className="p-2 border border-zinc-600 rounded-md my-4"
              {...register("imagen")}
            />
          </div>

        </div>

      </div>
    </form>
  )
}