
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { verificarAdministrador } from '@/lib/api';

export default function GestionLayout({ children }) {
  const router = useRouter();

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
      <p role="alert" className="p-6 text-red-500">
        {error}
      </p>
    );
  }

  if (!autorizado) {
    return <p className="p-6">Verificando permisos...</p>;
  }

  return (
    <div className="min-h-screen">
      <header className="border-b p-4">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <Link href="/admin" className="text-xl font-bold">
            Carpincho Admin
          </Link>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/admin">Inicio</Link>
            <Link href="/usuarios">Usuarios</Link>
            <Link href="/clientes">Clientes</Link>
            <Link href="/vendedores">Vendedores</Link>

            <button
              type="button"
              onClick={cerrarSesion}
              className="rounded bg-red-600 px-4 py-2 text-white"
            >
              Cerrar sesión
            </button>
          </div>
        </nav>
      </header>

      <div className="mx-auto max-w-6xl p-6">
        {children}
      </div>
    </div>
  );
}
