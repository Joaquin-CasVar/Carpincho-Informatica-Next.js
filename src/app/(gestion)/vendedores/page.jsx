
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { listarVendedores, desactivarVendedor } from '@/lib/api';
import BotonDesactivar from '@/components/gestion/BotonDesactivar';
import Paginacion from '@/components/gestion/Paginacion';

export default function VendedoresPage() {
  const [vendedores, setVendedores] = useState([]);
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

    async function cargarVendedores() {
      try {
        const data = await listarVendedores(pagina);

        if (cancelado) return;

        if (Array.isArray(data)) {
          setVendedores(data);
          setTotal(data.length);
          setHaySiguiente(false);
          setHayAnterior(false);
        } else {
          setVendedores(data.results ?? []);
          setTotal(data.count ?? null);
          setHaySiguiente(Boolean(data.next));
          setHayAnterior(Boolean(data.previous));
        }
      } catch (err) {
        if (!cancelado) {
          setVendedores([]);
          setError(err.message);
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    }

    cargarVendedores();

    return () => {
      cancelado = true;
    };
  }, [pagina, versionListado]);

  function actualizarListado() {
    setMensaje('Vendedor desactivado correctamente.');
    setError('');
    setCargando(true);

    if (vendedores.length === 1 && pagina > 1) {
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
            Gestión de vendedores
          </h1>

          <p className="mt-2">
            Consultá y administrá los vendedores registrados.
          </p>
        </div>

        <Link
          href="/vendedores/nuevo"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + Nuevo vendedor
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
        <p>Cargando vendedores...</p>
      ) : !error && vendedores.length === 0 ? (
        <p>No hay vendedores registrados.</p>
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
                  <th className="p-3">Salario</th>
                  <th className="p-3">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {vendedores.map((vendedor) => (
                  <tr
                    key={vendedor.id}
                    className="border-b last:border-b-0"
                  >
                    <td className="p-3">
                      {vendedor.id}
                    </td>

                    <td className="p-3">
                      {vendedor.persona?.username || '-'}
                    </td>

                    <td className="p-3">
                      {vendedor.persona?.first_name || ''}{' '}
                      {vendedor.persona?.last_name || ''}
                    </td>

                    <td className="p-3">
                      {vendedor.persona?.email || '-'}
                    </td>

                    <td className="p-3">
                      {Number(vendedor.salario).toLocaleString(
                        'es-AR',
                        {
                          style: 'currency',
                          currency: 'ARS',
                          minimumFractionDigits: 2,
                        }
                      )}
                    </td>

                    <td className="p-3">
                      <div className="flex flex-wrap items-center gap-4">
                        <Link
                          href={`/vendedores/${vendedor.id}/editar`}
                          className="font-medium text-blue-500 hover:underline"
                        >
                          Editar
                        </Link>

                        <BotonDesactivar
                          id={vendedor.id}
                          nombre={
                            vendedor.persona?.username ||
                            `vendedor #${vendedor.id}`
                          }
                          onDesactivar={desactivarVendedor}
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
            nombreEntidad="vendedores"
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
