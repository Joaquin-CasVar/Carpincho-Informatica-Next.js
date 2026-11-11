"use client"

import { useRouter } from "next/navigation"
import axios from "axios"

export default function DeleteModal({ object, route, isOpen, onClose }) {
  const router = useRouter();

  const handleDelete = async () => {
    const token = sessionStorage.getItem('access')

    if (!token) router.push("/account/login")

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}${route}/${object.id}/borrado_logico/`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      router.push(`/${route}`)

    } catch (error) {
      console.error(`Codigo de error: ${error.status}. ${error.response.data.detail}`)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div role="dialog" aria-modal="true" className="card flex w-full max-w-md flex-col items-center gap-4 p-6 text-center shadow-2xl">

        <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden="true">
            <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6" />
          </svg>
        </span>

        <span className="text-lg font-semibold">¿Estás seguro de que deseas eliminar {object.nombre}?</span>
        <p className="text-sm text-muted-foreground">Esta acción no se puede deshacer.</p>

        <div className="mt-2 flex w-full gap-3">
          <button
            className="btn btn-secondary flex-1"
            onClick={onClose}
          >
            No, cancelar
          </button>

          <button onClick={handleDelete} className="btn btn-danger flex-1">
            Si, Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}