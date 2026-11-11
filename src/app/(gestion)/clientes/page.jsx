
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { listarClientes, desactivarCliente } from '@/lib/api';
import BotonDesactivar from '@/components/gestion/BotonDesactivar';
import Paginacion from '@/components/gestion/Paginacion';

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
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

    async function cargarClientes() {
      try {
        const data = await listarClientes(pagina);

        if (cancelado) return;

        if (Array.isArray(data)) {
          setClientes(data);
          setTotal(data.length);
          setHaySiguiente(false);
          setHayAnterior(false);
        } else {
          setClientes(data.results ?? []);
          setTotal(data.count ?? null);
          setHaySiguiente(Boolean(data.next));
          setHayAnterior(Boolean(data.previous));
        }
      } catch (err) {
        if (!cancelado) {
          setClientes([]);
          setError(err.message);
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    }

    cargarClientes();

    return () => {
      cancelado = true;
    };
  }, [pagina, versionListado]);

  function actualizarListado() {
    setMensaje('Cliente desactivado correctamente.');
    setError('');
    setCargando(true);

    if (clientes.length === 1 && pagina > 1) {
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
            Gestión de clientes
          </h1>

          <p className="page-subtitle">
            Consultá y administrá los clientes registrados.
          </p>
        </div>

        <Link
          href="/clientes/nuevo"
          className="btn btn-primary"
        >
          + Nuevo cliente
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
        <p className="text-sm text-muted-foreground">Cargando clientes...</p>
      ) : !error && clientes.length === 0 ? (
        <p className="text-sm text-muted-foreground">No hay clientes registrados.</p>
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
                  <th>Dirección</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>
                      {cliente.id}
                    </td>

                    <td>
                      {cliente.persona?.username || '-'}
                    </td>

                    <td>
                      {cliente.persona?.first_name || ''}{' '}
                      {cliente.persona?.last_name || ''}
                    </td>

                    <td>
                      {cliente.persona?.email || '-'}
                    </td>

                    <td>
                      {cliente.direccion || '-'}
                    </td>

                    <td>
                      <div className="flex flex-wrap items-center gap-4">
                        <Link
                          href={`/clientes/${cliente.id}/editar`}
                          className="link"
                        >
                          Editar
                        </Link>

                        <BotonDesactivar
                          id={cliente.id}
                          nombre={
                            cliente.persona?.username ||
                            `cliente #${cliente.id}`
                          }
                          onDesactivar={desactivarCliente}
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
            nombreEntidad="clientes"
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
