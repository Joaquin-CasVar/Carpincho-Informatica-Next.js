import { getResponse } from "@/lib/products"
import Link from "next/link"
import ProductoCard from "../components/producto/ProductoCard";
import Aside from "../components/producto/Aside";

export default function page() {
  const response = getResponse()
  const productos = response.results


  return (
    <div className="w-full">
      <div className="w-full border-b border-zinc-700 pb-4">
        <h1 className="text-9xl">Productos</h1>
        <Link href='/productos/cargar' className="m-2 p-2 border-2 rounded-2xl">
          Cargar producto
        </Link>
      </div>

      <div className="flex min-h-screen">
        <Aside />

        <div className="px-4">
          <div className="flex pt-4">
            <Link href={response.previous || ''} >
              <svg width="32" height="32" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
              </svg>
            </Link>
            <Link href={response.next || ''}>
              <svg width="32" height="32" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
              </svg>
            </Link>
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