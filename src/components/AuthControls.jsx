
'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

function suscribirse(callback) {
  window.addEventListener('storage', callback);
  window.addEventListener('sesion-actualizada', callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('sesion-actualizada', callback);
  };
}

function obtenerSesion() {
  return Boolean(sessionStorage.getItem('access'));
}

function obtenerSesionServidor() {
  return false;
}

export default function AuthControls() {
  const router = useRouter();
  const pathname = usePathname();

  const autenticado = useSyncExternalStore(
    suscribirse,
    obtenerSesion,
    obtenerSesionServidor
  );

  // Mantiene actualizado el componente al navegar.
  void pathname;

  function cerrarSesion() {
    sessionStorage.removeItem('access');
    sessionStorage.removeItem('refresh');

    window.dispatchEvent(new Event('sesion-actualizada'));

    router.replace('/');
    router.refresh();
  }

  if (autenticado) {
    return (
      <button
        type="button"
        onClick={cerrarSesion}
        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Cerrar sesión
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/account/login"
        className="hover:underline"
      >
        Iniciar sesión
      </Link>

      <Link
        href="/account/register"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Registrarse
      </Link>
    </div>
  );
}
