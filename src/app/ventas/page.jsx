import Link from "next/link";
import VentaCard from "@/components/VentaCard";
import { ventasEjemplo } from "@/data/ventasEjemplo";

export default function VentasPage() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Listado de ventas</h2>
        <Link
          href="/ventas/create"
          className="rounded-full bg-foreground px-5 py-2 font-medium text-background transition-opacity hover:opacity-80"
        >
          Nueva venta
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ventasEjemplo.map((venta) => (
          <VentaCard key={venta.id} venta={venta} />
        ))}
      </div>
    </section>
  );
}
