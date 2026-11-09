"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";
import DeleteModal from "./DeleteModal";

export default function EditDeleteButtons({ object, route }) {
  const router = useRouter();

  const [confirmDeletion, setConfirmDeletion] = useState(false)

  const handleEdit = () => {
    sessionStorage.setItem(`${route}Editar`, JSON.stringify(object))

    router.push(`/${route}/cargar`)
  }
  

  return (
    <div className="flex flex-col gap-8">
      <button onClick={handleEdit} className='bg-emerald-500 text-white p-2 rounded-md cursor-pointer'>
        Editar Producto
      </button>
      <button onClick={() => setConfirmDeletion(true)} className='bg-red-500 text-white p-2 rounded-md cursor-pointer'>
        Borrar Producto
      </button>

      <DeleteModal object={object} route={route} isOpen={confirmDeletion} onClose={() => setConfirmDeletion(false)}/>
    </div>
  )
}