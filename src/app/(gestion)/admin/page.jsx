
import Link from 'next/link';

const secciones = [
  {
    titulo: 'Usuarios',
    descripcion: 'Consultar, crear y editar usuarios del sistema.',
    ruta: '/usuarios',
  },
  {
    titulo: 'Clientes',
    descripcion: 'Registrar clientes y gestionar sus direcciones.',
    ruta: '/clientes',
  },
  {
    titulo: 'Vendedores',
    descripcion: 'Registrar vendedores y administrar sus salarios.',
    ruta: '/vendedores',
  },
];

export default function AdminPage() {
  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Panel de administración
        </h1>

        <p className="mt-2">
          Gestioná los usuarios, clientes y vendedores
          de Carpincho Informática.
        </p>
      </div>

      <section className="grid gap-5 md:grid-cols-3">
        {secciones.map((seccion) => (
          <article
            key={seccion.titulo}
            className="rounded-xl border p-6"
          >
            <h2 className="text-xl font-semibold">
              {seccion.titulo}
            </h2>

            <p className="my-4">
              {seccion.descripcion}
            </p>

            <Link
              href={seccion.ruta}
              className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Administrar
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
