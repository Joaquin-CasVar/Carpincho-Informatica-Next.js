import Link from "next/link";

const categorias = [
  { nombre: "Procesadores", descripcion: "Intel y AMD" },
  { nombre: "Placas de video", descripcion: "NVIDIA y AMD" },
  { nombre: "Memorias RAM", descripcion: "DDR4 y DDR5" },
  { nombre: "Almacenamiento", descripcion: "SSD y discos rígidos" },
  { nombre: "Periféricos", descripcion: "Teclados, mouses y monitores" },
  { nombre: "Notebooks", descripcion: "Para trabajo y gaming" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="flex flex-col items-center gap-6 px-6 py-24 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">
          Carpincho Informática
        </h1>
        <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Tienda de informática y hardware. Todo lo que necesitás para armar,
          mejorar o reemplazar tu equipo.
        </p>
        <Link
          href="/productos"
          className="rounded-full bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-80"
        >
          Ver productos
        </Link>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-24">
        <h2 className="mb-6 text-2xl font-semibold">Categorías</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((cat) => (
            <div
              key={cat.nombre}
              className="rounded-xl border border-black/10 p-6 dark:border-white/20"
            >
              <h3 className="text-lg font-medium">{cat.nombre}</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                {cat.descripcion}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
