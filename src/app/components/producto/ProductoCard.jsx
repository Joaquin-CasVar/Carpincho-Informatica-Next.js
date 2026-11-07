import Link from "next/link"

export default function ProductoCard({ producto }) {

  return (
    <Link href={`/productos/${producto.id}`} className="">
      <section className="p-6 rounded-lg flex flex-col bg-zinc-800">
        {producto.imagen !== '' &&
          <img src={producto.imagen} alt="Imagen del producto" className="w-full h-auto" />
        }

        <p className="text-sm">{producto.tipo.tipo}</p>
        {producto.tipo.tipo === 'CPU' && <p>{producto.fabricante.nombre} {producto.nombre}</p>}
        {producto.tipo.tipo === 'GPU' && (
          <p>
            {producto.fabricante.nombre} {producto.nombre} {producto.detalle_componente?.chipset?.nombre}
          </p>
        )}
        <p>${producto.precio}</p>

      </section>
    </Link>
  )
}