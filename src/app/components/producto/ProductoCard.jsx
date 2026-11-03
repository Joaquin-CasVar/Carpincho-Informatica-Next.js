import Link from "next/link"
import Image from "next/image"

export default function ProductoCard({ producto }) {

  return (
    <Link href={`/productos/${producto.id}`} className="">
      <section className="p-6 rounded-lg flex flex-col bg-zinc-800">
        <Image
          src={producto.imagen}
          alt="Imagen del producto"
          width="0"
          height="0"
          sizes="100vh"
          className="w-full h-auto"
        />

        <p className="text-sm">{producto.tipo.tipo}</p>
        {producto.tipo.tipo === 'CPU' && <p>{producto.fabricante.nombre} {producto.nombre}</p>}
        {producto.tipo.tipo === 'GPU' && (
          <p>
            {producto.fabricante.nombre} {producto.nombre} {producto.detalle_componente.chipset.nombre}
          </p>
        )}
        <p>${producto.precio}</p>

      </section>
    </Link>
  )
}