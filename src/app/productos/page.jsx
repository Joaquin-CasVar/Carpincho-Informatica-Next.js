"use client"

import axios from "axios";
import Link from "next/link"
import { useEffect, useState } from "react";

import ProductoCard from "../components/producto/ProductoCard";
import Aside from "../components/producto/Aside";
import Icon from "@/components/Icon";

export default function page() {
  const [productos, setProductos] = useState([])
  const [pages, setPages] = useState({
    prev: null,
    next: null
  })
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    tipo: '',
    fabricante: '',
    color: '',
    search: '',
    ordering: '',
    page: 1
  })

  const fetchProductos = async () => {
    setLoading(true)

    const params = new URLSearchParams

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}productos/?${params.toString()}`)

      const data = response.data

      setProductos(data.results)
      setPages({
        prev: data.previous,
        next: data.next
      })

    } catch (error) {
      console.error(`Codigo de error: ${error.status}. ${error.response.data.detail}`)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductos()
  }, [filters])

  return (
    <div className="container-page flex flex-col gap-8 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="page-title">Productos</h1>
          <p className="page-subtitle">Componentes, periféricos y notebooks.</p>
        </div>
        <Link href='/productos/cargar' className="btn btn-primary">
          <Icon name="mas" className="size-4" />
          Cargar producto
        </Link>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <Aside filters={filters} setFilters={setFilters} />

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                disabled={!pages.prev}
                className="btn btn-secondary btn-icon"
                aria-label="Página anterior"
              >
                <Icon name="izquierda" />
              </button>
              <button
                onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                disabled={!pages.next}
                className="btn btn-secondary btn-icon"
                aria-label="Página siguiente"
              >
                <Icon name="derecha" />
              </button>
              <span className="text-sm text-muted-foreground">Página {filters.page}</span>
            </div>

            <select
              className="input w-auto cursor-pointer"
              value={filters.ordering}
              onChange={(e) => setFilters({...filters, ordering: e.target.value})}
              aria-label="Ordenar productos"
            >
              <option value="">Más Relevantes</option>
              <option value="precio">Menor Precio</option>
              <option value="-precio">Mayor Precio</option>
            </select>
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="skeleton h-72" />
              ))}
            </div>
          ) : productos.length === 0 ? (
            <div className="card flex flex-col items-center gap-3 px-6 py-16 text-center">
              <Icon name="caja" className="size-10 text-muted-foreground" />
              <p className="font-medium">No hay productos con esos filtros.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {productos.map((producto, key) => (
                <ProductoCard key={key} producto={producto} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}