"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import Icon from "@/components/Icon";

export default function EditDeleteButtons({ object, route }) {
  const router = useRouter();

  const [confirmDeletion, setConfirmDeletion] = useState(false)

  const handleEdit = () => {
    sessionStorage.setItem(`${route}Editar`, JSON.stringify(object))

    router.push(`/${route}/cargar`)
  }
  

  return (
    <div className="flex flex-wrap gap-2 md:flex-col">
      <button onClick={handleEdit} className='btn btn-secondary'>
        <Icon name="editar" className="size-4" />
        Editar Producto
      </button>
      <button onClick={() => setConfirmDeletion(true)} className='btn btn-danger'>
        <Icon name="basura" className="size-4" />
        Borrar Producto
      </button>

      <DeleteModal object={object} route={route} isOpen={confirmDeletion} onClose={() => setConfirmDeletion(false)}/>
    </div>
  )
}