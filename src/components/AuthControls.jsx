
'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

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
        className="btn btn-secondary btn-sm"
      >
        <Icon name="salir" className="size-4" />
        Cerrar sesión
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/account/login"
        className="btn btn-ghost btn-sm"
      >
        Iniciar sesión
      </Link>

      <Link
        href="/account/register"
        className="btn btn-primary btn-sm"
      >
        Registrarse
      </Link>
    </div>
  );
}
