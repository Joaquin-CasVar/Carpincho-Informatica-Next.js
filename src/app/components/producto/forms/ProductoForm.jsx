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
      <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>

        <div className='flex flex-col'>
          <p className='label'>Nombre <label className='ml-1 text-xs font-normal text-destructive'>{errors.nombre && "*" + errors.nombre.message}</label></p>
          <input
            type="text"
            placeholder='Nombre'
            className='input'
            {...register("nombre")}
          />
        </div>

        <div className='flex flex-col'>
          <p className='label'>Precio <label className='ml-1 text-xs font-normal text-destructive'>{errors.precio && "*" + errors.precio.message}</label></p>
          <div className='input flex items-center gap-2 focus-within:border-primary focus-within:ring-3 focus-within:ring-ring/25'>
            <span className='text-sm text-muted-foreground'>$</span>
            <input
              type="number"
              placeholder='0.00'
              className='w-full min-w-0 bg-transparent outline-none'
              {...register("precio", { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <p className='label'>Stock <label className='ml-1 text-xs font-normal text-destructive'>{errors.stock && "*" + errors.stock.message}</label></p>

          <input
            type="number"
            placeholder="0"
            className='input'
            {...register('stock', { valueAsNumber: true })}
          />
        </div>

        <div className='flex flex-col'>
          <p className='label'>Fabricante <label className='ml-1 text-xs font-normal text-destructive'>{errors.fabricante && "*" + errors.fabricante.message}</label></p>
          <select
            className='input cursor-pointer'
            {...register("fabricante", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar Fabricante</option>

            {fabricantes.map((fabricante) => (
              <option key={fabricante.id} value={fabricante.id}>{fabricante.nombre}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <p className='label'>Color <label className='ml-1 text-xs font-normal text-destructive'>{errors.color && "*" + errors.color.message}</label></p>
          <select
            className='input cursor-pointer'
            {...register("color", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar Color</option>

            {colores.map((color) => (
              <option key={color.id} value={color.id}>{color.nombre}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <p className='label'>Tipo <label className='ml-1 text-xs font-normal text-destructive'>{errors.tipo && "*" + errors.tipo.message}</label></p>
          <select
            className='input cursor-pointer'
            {...register("tipo", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar Tipo</option>

            {tipos.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>{tipo.tipo}</option>
            ))}
          </select>

          <div className='mt-5 flex flex-col'>
            <p className='label'>Imagen <label className='ml-1 text-xs font-normal text-destructive'>{errors.imagen && "*" + errors.imagen.message}</label></p>
            <input
              type="text"
              placeholder='https://link/de/la/imagen.com'
              className='input'
              {...register("imagen")}
            />
          </div>

        </div>

      </div>
    </form>
  )
}