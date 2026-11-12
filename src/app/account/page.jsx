import Link from 'next/link';
import { LogoMarca } from '@/components/Logo';

export default function AccountPage() { //server component, renderiza en el servidor antes de enviarlo al navegador
  return (
    <main className="container-page flex flex-1 flex-col items-center justify-center gap-8 py-16 text-center">
      <LogoMarca className="size-14" />

      <div>
        <h1 className="page-title">Mi cuenta</h1>
        <p className="page-subtitle">Bienvenido a Carpincho Informática.</p>
      </div>

      <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
        <Link href="/account/login" className="card card-hover p-6 text-left">
          <span className="font-semibold">Iniciar sesión</span>
          <span className="mt-1 block text-sm text-muted-foreground">
            Si ya tenés una cuenta.
          </span>
        </Link>

        <Link href="/account/register" className="card card-hover p-6 text-left">
          <span className="font-semibold">Crear cuenta</span>
          <span className="mt-1 block text-sm text-muted-foreground">
            Es gratis y lleva un minuto.
          </span>
        </Link>
      </div>
    </main>
  );
}
