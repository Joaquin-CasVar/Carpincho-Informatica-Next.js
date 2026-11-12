import Link from "next/link";
import Icon from "@/components/Icon";

const categorias = [
  { nombre: "Procesadores", descripcion: "Intel y AMD", icono: "chip" },
  { nombre: "Placas de video", descripcion: "NVIDIA y AMD", icono: "gpu" },
  { nombre: "Memorias RAM", descripcion: "DDR4 y DDR5", icono: "memoria" },
  { nombre: "Almacenamiento", descripcion: "SSD y discos rígidos", icono: "disco" },
  { nombre: "Periféricos", descripcion: "Teclados, mouses y monitores", icono: "teclado" },
  { nombre: "Notebooks", descripcion: "Para trabajo y gaming", icono: "notebook" },
];

const beneficios = [
  {
    titulo: "Envíos a todo el país",
    descripcion: "Recibí tus componentes donde estés.",
    icono: "camion",
  },
  {
    titulo: "Garantía en todo",
    descripcion: "Productos originales con garantía oficial.",
    icono: "escudo",
  },
  {
    titulo: "Te ayudamos a armar tu PC",
    descripcion: "Asesoramiento para elegir cada pieza.",
    icono: "herramienta",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Portada */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0" />
          <div className="absolute top-[-12rem] left-1/2 h-[30rem] w-[56rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        </div>

        <div className="container-page flex flex-col items-center gap-8 py-24 text-center sm:py-32">
          <span className="badge">
            <Icon name="chip" className="size-3.5" />
            Hardware, componentes y periféricos
          </span>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Todo para armar tu <span className="text-primary">PC ideal</span>,
            en un solo lugar
          </h1>

          <p className="max-w-xl text-lg text-pretty text-muted-foreground">
            Tienda de informática y hardware. Todo lo que necesitás para armar,
            mejorar o reemplazar tu equipo.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/productos" className="btn btn-primary btn-lg">
              Ver productos
              <Icon name="flecha" className="size-4" />
            </Link>
            <Link href="/about" className="btn btn-secondary btn-lg">
              Conocé la tienda
            </Link>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="container-page">
        <div className="card grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {beneficios.map((beneficio) => (
            <div key={beneficio.titulo} className="flex items-start gap-4 p-6">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={beneficio.icono} />
              </span>
              <div>
                <h3 className="font-medium">{beneficio.titulo}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {beneficio.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categorías */}
      <section className="container-page py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Categorías
            </h2>
            <p className="page-subtitle">
              Encontrá lo que buscás por tipo de producto.
            </p>
          </div>
          <Link
            href="/productos"
            className="link inline-flex items-center gap-1 text-sm"
          >
            Ver todo el catálogo
            <Icon name="flecha" className="size-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((cat) => (
            <Link
              key={cat.nombre}
              href="/productos"
              className="group card card-hover flex items-center gap-4 p-6"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon name={cat.icono} className="size-6" />
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-medium">{cat.nombre}</h3>
                <p className="text-sm text-muted-foreground">
                  {cat.descripcion}
                </p>
              </div>
              <Icon
                name="derecha"
                className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="container-page">
        <div className="card relative isolate overflow-hidden px-6 py-14 text-center sm:px-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-transparent to-primary/5"
          />
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            ¿Listo para tu próxima compra?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Creá tu cuenta y empezá a armar tu equipo con nosotros.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/account/register" className="btn btn-primary btn-lg">
              Crear cuenta
            </Link>
            <Link href="/productos" className="btn btn-secondary btn-lg">
              Explorar productos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
