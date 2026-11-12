
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="space-y-8">
      <section className="space-y-4">
        <h1 className="page-title">
          Sobre Carpincho Informática
        </h1>

        <p className="text-lg text-muted-foreground">
          Carpincho Informática es una tienda dedicada
          a la comercialización de computadoras,
          componentes y accesorios tecnológicos.
        </p>

        <p>
          Nuestro objetivo es facilitar el acceso a
          productos de informática, ofreciendo una
          plataforma donde los clientes puedan
          explorar nuestro catálogo y encontrar
          los componentes que necesitan.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="card p-6">
          <h2 className="mb-2 text-xl font-semibold">
            Productos
          </h2>
          <p>
            Computadoras, procesadores, placas de video
            y accesorios para diferentes necesidades.
          </p>
        </article>

        <article className="card p-6">
          <h2 className="mb-2 text-xl font-semibold">
            Tecnología
          </h2>
          <p>
            Un catálogo organizado para facilitar
            la búsqueda de productos informáticos.
          </p>
        </article>

        <article className="card p-6">
          <h2 className="mb-2 text-xl font-semibold">
            Atención
          </h2>
          <p>
            Un espacio para resolver consultas
            sobre productos y funcionamiento
            de la tienda.
          </p>
        </article>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          ¿Necesitás ayuda?
        </h2>

        <p>
          Consultá nuestras preguntas frecuentes
          o visitá la página de contacto.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/about/faq"
            className="btn btn-primary"
          >
            Preguntas frecuentes
          </Link>

          <Link
            href="/about/contacto"
            className="btn btn-secondary"
          >
            Contacto
          </Link>
        </div>
      </section>
    </main>
  );
}
