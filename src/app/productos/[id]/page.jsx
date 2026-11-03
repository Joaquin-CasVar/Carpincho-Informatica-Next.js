import Image from "next/image"

import { getResponseDetail } from "@/lib/products"
import CpuSpecs from "@/app/components/producto/CpuSpecs"
import GpuSpecs from "@/app/components/producto/GpuSpecs"
import EditDeleteButtons from "@/app/components/EditDeleteButtons"

export default async function page({ params }) {
  const { id } = await params

  const producto = getResponseDetail(id)

  return (
    <div>
      <h1 className="text-9xl">Detalle del Producto {id}</h1>

      <section className="my-8 p-6 rounded-lg flex justify-around bg-zinc-800">
        <Image src={producto.imagen} alt="Imagen del producto" width={100} height={100} />

        <div>
          <p>{producto.tipo.tipo} {producto.fabricante.nombre} {producto.nombre}</p>
          <p>${producto.precio}</p>
        </div>

        <EditDeleteButtons object={producto} route={'productos'} />
      </section>

      <section className="flex flex-col items-center">
        <h3 className="text-2xl">Especificaciones</h3>

        <div>
          <p>Fabricante {producto.fabricante.nombre}</p>
          <p>Color {producto.color.nombre}</p>

          {producto.tipo.tipo === 'CPU' && <CpuSpecs specs={producto.detalle_componente} />}
          {producto.tipo.tipo === 'GPU' && <GpuSpecs specs={producto.detalle_componente} />}

        </div>
      </section>
    </div>
  )
}