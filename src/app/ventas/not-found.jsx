import Link from "next/link";

export default function VentaNoEncontrada() {
  return (
    <section className="flex flex-col items-start gap-4">
      <h2 className="text-2xl font-semibold">Venta no encontrada</h2>
      <p className="text-zinc-600 dark:text-zinc-400">
        La venta que buscás no existe o fue dada de baja.
      </p>
      <Link
        href="/ventas"
        className="text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400"
      >
        ← Volver a ventas
      </Link>
    </section>
  );
}
