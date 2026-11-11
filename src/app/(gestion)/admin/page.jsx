
import Link from 'next/link';
import Icon from '@/components/Icon';

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

const iconos = {
  Usuarios: 'usuarios',
  Clientes: 'usuario',
  Vendedores: 'vendedor',
};

export default function AdminPage() {
  return (
    <main className="space-y-6">
      <div>
        <h1 className="page-title">
          Panel de administración
        </h1>

        <p className="page-subtitle">
          Gestioná los usuarios, clientes y vendedores
          de Carpincho Informática.
        </p>
      </div>

      <section className="grid gap-5 md:grid-cols-3">
        {secciones.map((seccion) => (
          <article
            key={seccion.titulo}
            className="card card-hover flex flex-col p-6"
          >
            <span className="mb-4 grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Icon name={iconos[seccion.titulo]} className="size-5" />
            </span>

            <h2 className="text-xl font-semibold">
              {seccion.titulo}
            </h2>

            <p className="my-4 flex-1 text-sm text-muted-foreground">
              {seccion.descripcion}
            </p>

            <Link
              href={seccion.ruta}
              className="btn btn-primary"
            >
              Administrar
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
