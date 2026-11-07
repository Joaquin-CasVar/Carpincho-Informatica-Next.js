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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-zinc-900 border-zinc-700 rounded-lg 
      p-4 flex flex-col items-center gap-4">

        <span className="text-2xl">Estas seguro de que deseas eliminar {object.nombre}?</span>


        <div className="w-full max-w-xl flex justify-between">
          <button
            className="bg-zinc-700 px-3 py-1.5 rounded cursor-pointer"
            onClick={onClose}
          >
            No, cancelar
          </button>

          <button onClick={handleDelete} className="bg-red-500 px-3 py-1.5 rounded cursor-pointer font-bold">
            Si, Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}