
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
          <h1 className="page-title">
            Gestión de usuarios
          </h1>

          <p className="page-subtitle">
            Consultá y administrá los usuarios del sistema.
          </p>
        </div>

        <Link
          href="/usuarios/nuevo"
          className="btn btn-primary"
        >
          + Nuevo usuario
        </Link>
      </div>

      {mensaje && (
        <p role="status" className="alert-success">
          {mensaje}
        </p>
      )}

      {error && (
        <p role="alert" className="alert-error">
          {error}
        </p>
      )}

      {cargando ? (
        <p className="text-sm text-muted-foreground">Cargando usuarios...</p>
      ) : !error && usuarios.length === 0 ? (
        <p className="text-sm text-muted-foreground">No hay usuarios registrados.</p>
      ) : !error ? (
        <>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>
                      {usuario.id}
                    </td>

                    <td>
                      {usuario.username}
                    </td>

                    <td>
                      {usuario.first_name}{' '}
                      {usuario.last_name}
                    </td>

                    <td>
                      {usuario.email || '-'}
                    </td>

                    <td>
                      {usuario.telefono || '-'}
                    </td>

                    <td>
                      <div className="flex flex-wrap items-center gap-4">
                        <Link
                          href={`/usuarios/${usuario.id}/editar`}
                          className="link"
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
