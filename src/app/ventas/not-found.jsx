import Link from "next/link";
import Icon from "@/components/Icon";

export default function VentaNoEncontrada() {
  return (
    <section className="card flex flex-col items-center gap-4 px-6 py-14 text-center">
      <Icon name="recibo" className="size-10 text-muted-foreground" />
      <h2 className="text-xl font-semibold">Venta no encontrada</h2>
      <p className="max-w-md text-sm text-muted-foreground">
        La venta o la página que buscás no existe, o fue dada de baja.
      </p>
      <Link href="/ventas" className="btn btn-secondary">
        <Icon name="volver" className="size-4" />
        Volver a ventas
      </Link>
    </section>
  );
}
