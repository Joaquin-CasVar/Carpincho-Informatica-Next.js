
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { listarClientes } from '@/lib/api';

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [total, setTotal] = useState(null);
  const [haySiguiente, setHaySiguiente] = useState(false);
  const [hayAnterior, setHayAnterior] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelado = false;

    async function cargarClientes() {
      setCargando(true);
      setError('');

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
  }, [pagina]);

  return (
    <main className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Gestión de clientes
          </h1>

          <p className="mt-2">
            Consultá y administrá los clientes registrados.
          </p>
        </div>

        <Link
          href="/clientes/nuevo"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + Nuevo cliente
        </Link>
      </div>

      {error && (
        <p role="alert" className="text-red-500">
          {error}
        </p>
      )}

      {cargando ? (
        <p>Cargando clientes...</p>
      ) : !error && clientes.length === 0 ? (
        <p>No hay clientes registrados.</p>
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
                  <th className="p-3">Dirección</th>
                  <th className="p-3">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {clientes.map((cliente) => (
                  <tr
                    key={cliente.id}
                    className="border-b last:border-b-0"
                  >
                    <td className="p-3">
                      {cliente.id}
                    </td>

                    <td className="p-3">
                      {cliente.persona?.username || '-'}
                    </td>

                    <td className="p-3">
                      {cliente.persona?.first_name || ''}{' '}
                      {cliente.persona?.last_name || ''}
                    </td>

                    <td className="p-3">
                      {cliente.persona?.email || '-'}
                    </td>

                    <td className="p-3">
                      {cliente.direccion || '-'}
                    </td>

                    <td className="p-3">
                      <Link
                        href={`/clientes/${cliente.id}/editar`}
                        className="font-medium text-blue-500 hover:underline"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p>Página {pagina}</p>

              {total !== null && (
                <p className="text-sm opacity-70">
                  Total de clientes: {total}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                disabled={!hayAnterior || cargando}
                onClick={() =>
                  setPagina((prev) => Math.max(1, prev - 1))
                }
                className="rounded border px-4 py-2 disabled:opacity-40"
              >
                Anterior
              </button>

              <button
                type="button"
                disabled={!haySiguiente || cargando}
                onClick={() =>
                  setPagina((prev) => prev + 1)
                }
                className="rounded border px-4 py-2 disabled:opacity-40"
              >
                Siguiente
              </button>
            </div>
          </div>
        </>
      ) : null}
    </main>
  );
}
