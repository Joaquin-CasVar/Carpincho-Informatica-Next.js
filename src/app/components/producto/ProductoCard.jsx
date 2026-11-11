import Link from "next/link"
import Icon from "@/components/Icon"
import { formatearPrecio } from "@/lib/formatters"

export default function ProductoCard({ producto }) {

  return (
    <Link href={`/productos/${producto.id}`} className="group card card-hover flex flex-col overflow-hidden">
      <div className="grid aspect-[4/3] place-items-center bg-muted/50 p-4">
        {producto.imagen ?
          <img src={producto.imagen} alt="Imagen del producto" className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" />
          : <Icon name={producto.tipo.tipo === 'GPU' ? 'gpu' : 'chip'} className="size-12 text-muted-foreground" />
        }
      </div>

      <div className="flex flex-1 flex-col gap-2 border-t border-border p-4">
        <span className="badge self-start">{producto.tipo.tipo}</span>
        {producto.tipo.tipo === 'CPU' && <p className="font-medium">{producto.fabricante.nombre} {producto.nombre}</p>}
        {producto.tipo.tipo === 'GPU' && (
          <p className="font-medium">
            {producto.fabricante.nombre} {producto.nombre} {producto.detalle_componente?.chipset?.nombre}
          </p>
        )}
        <p className="mt-auto pt-2 text-xl font-semibold tracking-tight tabular-nums">{formatearPrecio(producto.precio)}</p>
      </div>
    </Link>
  )
}
