'use client'

import axios from "axios"
import { use, useEffect, useState } from "react"

import CpuSpecs from "@/app/components/producto/CpuSpecs"
import GpuSpecs from "@/app/components/producto/GpuSpecs"
import EditDeleteButtons from "@/app/components/EditDeleteButtons"

export default function page({ params }) {
  const { id } = use(params)
  const [producto, setProducto] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchProducto = async () => {
    setLoading(true)

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}productos/${id}/`)

      setProducto(response.data)

    } catch (error) {
      console.error(`Codigo de error: ${error.status}. ${error.response.data.detail}`)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducto()
  }, [])

  return (
    <div>
      <h1 className="text-9xl">Detalle del Producto</h1>

      <section className="my-8 p-6 rounded-lg flex justify-around bg-zinc-800">
        {producto.imagen !== '' && <img src={producto.imagen} alt="Imagen del producto" className="w-40" /> }

        <div>
          <p>{producto.tipo?.tipo} {producto.fabricante?.nombre} {producto.nombre}</p>
          <p>${producto.precio}</p>
        </div>

        <EditDeleteButtons object={producto} route={'productos'} />
      </section>

      <section className="flex flex-col items-center">
        <h3 className="text-2xl">Especificaciones</h3>

        <div>
          <p>Fabricante {producto.fabricante?.nombre}</p>
          <p>Color {producto.color?.nombre}</p>

          {(producto.tipo?.tipo === 'CPU' && producto.detalle_componente !== 'No hay detalle') &&
            <CpuSpecs specs={producto.detalle_componente} />
          }

          {(producto.tipo?.tipo === 'GPU' && producto.detalle_componente !== 'No hay detalle') &&
            <GpuSpecs specs={producto.detalle_componente} />
          }

          {producto.detalle_componente === 'No hay detalle' && <p>Error al cargar los detalles</p>}
        </div>
      </section>
    </div>
  )
}