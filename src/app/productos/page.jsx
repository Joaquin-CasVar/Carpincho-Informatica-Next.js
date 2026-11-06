"use client"

import axios from "axios";
import Link from "next/link"
import { useEffect, useState } from "react";

import ProductoCard from "../components/producto/ProductoCard";
import Aside from "../components/producto/Aside";

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
      console.error(error)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductos()
  }, [filters])

  return (
    <div className="w-full">
      <div className="w-full border-b border-zinc-700 pb-4">
        <h1 className="text-9xl">Productos</h1>
        <Link href='/productos/cargar' className="m-2 p-2 border-2 rounded-2xl">
          Cargar producto
        </Link>
      </div>

      <div className="flex min-h-screen">
        <Aside filters={filters} setFilters={setFilters} />

        <div className="px-4">
          <div className="flex justify-between items-center pt-4">
            <div className="flex items-center">
              <button
                onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                disabled={!pages.prev}
                className="cursor-pointer disabled:cursor-default disabled:text-zinc-500 enabled:hover:scale-105"
              >
                <svg width="32" height="32" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>
              </button>
              <button
                onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                disabled={!pages.next}
                className="cursor-pointer disabled:cursor-default disabled:text-zinc-500 enabled:hover:scale-105"
              >
                <svg width="32" height="32" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </button>
            </div>

            <select
              className="cursor-pointer p-2 border border-zinc-600 rounded-md my-4"
              value={filters.ordering}
              onChange={(e) => setFilters({...filters, ordering: e.target.value})}
            >
              <option value="">Más Relevantes</option>
              <option value="precio">Menor Precio</option>
              <option value="-precio">Mayor Precio</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4">
            {productos.map((producto, key) => (
              <ProductoCard key={key} producto={producto} />
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}