import Link from "next/link";

export default function VentaNoEncontrada() {
  return (
    <section>
      <h2>Venta no encontrada</h2>
      <p>
        La venta o la página que buscás no existe, o fue dada de baja.
      </p>
      <Link href="/ventas">
        ← Volver a ventas
      </Link>
    </section>
  );
}
