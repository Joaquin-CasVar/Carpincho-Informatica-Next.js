
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { verificarAdministrador } from '@/lib/api';

export default function GestionLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [autorizado, setAutorizado] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelado = false;

    async function comprobarAcceso() {
      const token = sessionStorage.getItem('access');

      if (!token) {
        router.replace('/account/login');
        return;
      }

      try {
        const permiso = await verificarAdministrador(token);

        if (cancelado) return;

        if (permiso === 'administrador') {
          setAutorizado(true);
        } else if (permiso === 'sin_permisos') {
          router.replace('/');
        } else {
          sessionStorage.removeItem('access');
          sessionStorage.removeItem('refresh');
          router.replace('/account/login');
        }
      } catch (err) {
        if (!cancelado) {
          setError(err.message);
        }
      }
    }

    comprobarAcceso();

    return () => {
      cancelado = true;
    };
  }, [router]);

  const cerrarSesion = () => {
    sessionStorage.removeItem('access');
    sessionStorage.removeItem('refresh');

    setAutorizado(false);
    router.replace('/');
    router.refresh();
  };
  
  if (error) {
    return (
      <div className="container-page py-10">
        <p role="alert" className="alert-error">
          {error}
        </p>
      </div>
    );
  }

  if (!autorizado) {
    return (
      <p className="container-page flex items-center gap-2 py-16 text-sm text-muted-foreground">
        <span className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        Verificando permisos...
      </p>
    );
  }

  return (
    <div className="container-page flex flex-1 flex-col gap-8 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-muted/40 p-2">
        <nav className="flex flex-wrap items-center gap-1">
          <Link href="/admin" className="mr-2 flex items-center gap-2 px-3 py-1.5 text-sm font-semibold">
            <span className="size-2 rounded-full bg-primary" />
            Carpincho Admin
          </Link>
          {[
            { href: '/admin', label: 'Inicio' },
            { href: '/usuarios', label: 'Usuarios' },
            { href: '/clientes', label: 'Clientes' },
            { href: '/vendedores', label: 'Vendedores' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href))
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={cerrarSesion}
          className="btn btn-secondary btn-sm"
        >
          Cerrar sesión
        </button>
      </header>

      <div>
        {children}
      </div>
    </div>
  );
}
