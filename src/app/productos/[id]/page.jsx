'use client'

import axios from "axios"
import { use, useEffect, useState } from "react"

import CpuSpecs from "@/app/components/producto/CpuSpecs"
import GpuSpecs from "@/app/components/producto/GpuSpecs"
import EditDeleteButtons from "@/app/components/EditDeleteButtons"
import Link from "next/link"
import Icon from "@/components/Icon"
import { formatearPrecio } from "@/lib/formatters"

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
    <div className="container-page flex flex-col gap-6 py-10">
      <Link href="/productos" className="btn btn-ghost btn-sm self-start">
        <Icon name="volver" className="size-4" />
        Volver a productos
      </Link>

      {loading ? (
        <div className="skeleton h-72" />
      ) : (
        <section className="card grid gap-8 p-6 sm:p-8 md:grid-cols-[minmax(0,18rem)_1fr_auto] md:items-center">
          <div className="grid aspect-square place-items-center rounded-xl bg-muted/50 p-6">
            {producto.imagen
              ? <img src={producto.imagen} alt="Imagen del producto" className="h-full w-full object-contain" />
              : <Icon name={producto.tipo?.tipo === 'GPU' ? 'gpu' : 'chip'} className="size-16 text-muted-foreground" />
            }
          </div>

          <div className="flex flex-col gap-3">
            {producto.tipo?.tipo && <span className="badge self-start">{producto.tipo.tipo}</span>}
            <h1 className="page-title">{producto.fabricante?.nombre} {producto.nombre}</h1>
            <p className="text-3xl font-semibold tracking-tight text-primary tabular-nums">
              {producto.precio && formatearPrecio(producto.precio)}
            </p>
          </div>

          <EditDeleteButtons object={producto} route={'productos'} />
        </section>
      )}

      <section className="card p-6 sm:p-8">
        <h2 className="text-lg font-semibold">Especificaciones</h2>

        <div className="mt-4">
          <div className="grid gap-x-10 sm:grid-cols-2">
            <p className="flex justify-between gap-4 border-b border-border py-2.5 text-sm"><span className="text-muted-foreground">Fabricante</span><span className="font-medium">{producto.fabricante?.nombre}</span></p>
            <p className="flex justify-between gap-4 border-b border-border py-2.5 text-sm"><span className="text-muted-foreground">Color</span><span className="font-medium">{producto.color?.nombre}</span></p>
          </div>

          {(producto.tipo?.tipo === 'CPU' && producto.detalle_componente !== 'No hay detalle') &&
            <CpuSpecs specs={producto.detalle_componente} />
          }

          {(producto.tipo?.tipo === 'GPU' && producto.detalle_componente !== 'No hay detalle') &&
            <GpuSpecs specs={producto.detalle_componente} />
          }

          {producto.detalle_componente === 'No hay detalle' && <p className="alert-error mt-4">Error al cargar los detalles</p>}
        </div>
      </section>
    </div>
  )
}