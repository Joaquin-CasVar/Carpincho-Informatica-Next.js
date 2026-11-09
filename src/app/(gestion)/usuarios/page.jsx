
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { listarUsuarios, desactivarUsuario } from '@/lib/api';
import BotonDesactivar from '@/components/gestion/BotonDesactivar';
import Paginacion from '@/components/gestion/Paginacion';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [total, setTotal] = useState(null);
  const [haySiguiente, setHaySiguiente] = useState(false);
  const [hayAnterior, setHayAnterior] = useState(false);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [versionListado, setVersionListado] = useState(0);

  useEffect(() => {
    let cancelado = false;

    async function cargarUsuarios() {
      try {
        const data = await listarUsuarios(pagina);

        if (cancelado) return;

        if (Array.isArray(data)) {
          setUsuarios(data);
          setTotal(data.length);
          setHaySiguiente(false);
          setHayAnterior(false);
        } else {
          setUsuarios(data.results ?? []);
          setTotal(data.count ?? null);
          setHaySiguiente(Boolean(data.next));
          setHayAnterior(Boolean(data.previous));
        }
      } catch (err) {
        if (!cancelado) {
          setUsuarios([]);
          setError(err.message);
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    }

    cargarUsuarios();

    return () => {
      cancelado = true;
    };
  }, [pagina, versionListado]);

  function actualizarListado() {
    setMensaje('Usuario desactivado correctamente.');
    setError('');
    setCargando(true);

    if (usuarios.length === 1 && pagina > 1) {
      setPagina((prev) => prev - 1);
    } else {
      setVersionListado((prev) => prev + 1);
    }
  }

  function cambiarPagina(nuevaPagina) {
    setCargando(true);
    setError('');
    setMensaje('');
    setPagina(nuevaPagina);
  }

  return (
    <main className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Gestión de usuarios
          </h1>

          <p className="mt-2">
            Consultá y administrá los usuarios del sistema.
          </p>
        </div>

        <Link
          href="/usuarios/nuevo"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + Nuevo usuario
        </Link>
      </div>

      {mensaje && (
        <p role="status" className="text-green-600">
          {mensaje}
        </p>
      )}

      {error && (
        <p role="alert" className="text-red-500">
          {error}
        </p>
      )}

      {cargando ? (
        <p>Cargando usuarios...</p>
      ) : !error && usuarios.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : !error ? (
        <>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full border-collapse text-left">
              <thead className="border-b bg-gray-100 text-gray-900">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Usuario</th>
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Teléfono</th>
                  <th className="p-3">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {usuarios.map((usuario) => (
                  <tr
                    key={usuario.id}
                    className="border-b last:border-b-0"
                  >
                    <td className="p-3">
                      {usuario.id}
                    </td>

                    <td className="p-3">
                      {usuario.username}
                    </td>

                    <td className="p-3">
                      {usuario.first_name}{' '}
                      {usuario.last_name}
                    </td>

                    <td className="p-3">
                      {usuario.email || '-'}
                    </td>

                    <td className="p-3">
                      {usuario.telefono || '-'}
                    </td>

                    <td className="p-3">
                      <div className="flex flex-wrap items-center gap-4">
                        <Link
                          href={`/usuarios/${usuario.id}/editar`}
                          className="font-medium text-blue-500 hover:underline"
                        >
                          Editar
                        </Link>

                        <BotonDesactivar
                          id={usuario.id}
                          nombre={usuario.username}
                          onDesactivar={desactivarUsuario}
                          onDesactivado={actualizarListado}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Paginacion
            pagina={pagina}
            total={total}
            nombreEntidad="usuarios"
            hayAnterior={hayAnterior}
            haySiguiente={haySiguiente}
            cargando={cargando}
            onCambiarPagina={cambiarPagina}
          />
        </>
      ) : null}
    </main>
  );
}
