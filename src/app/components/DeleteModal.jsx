"use client"

import { useRouter } from "next/navigation"

export default function DeleteModal({ object, route, isOpen, onClose }) {
  const router = useRouter();

  const handleDelete = () => {
    console.log('borrado logico en la API');

    router.push(`/${route}`)
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