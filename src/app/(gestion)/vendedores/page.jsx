
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
          <h1 className="page-title">
            Gestión de vendedores
          </h1>

          <p className="page-subtitle">
            Consultá y administrá los vendedores registrados.
          </p>
        </div>

        <Link
          href="/vendedores/nuevo"
          className="btn btn-primary"
        >
          + Nuevo vendedor
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
        <p className="text-sm text-muted-foreground">Cargando vendedores...</p>
      ) : !error && vendedores.length === 0 ? (
        <p className="text-sm text-muted-foreground">No hay vendedores registrados.</p>
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
                  <th>Salario</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {vendedores.map((vendedor) => (
                  <tr key={vendedor.id}>
                    <td>
                      {vendedor.id}
                    </td>

                    <td>
                      {vendedor.persona?.username || '-'}
                    </td>

                    <td>
                      {vendedor.persona?.first_name || ''}{' '}
                      {vendedor.persona?.last_name || ''}
                    </td>

                    <td>
                      {vendedor.persona?.email || '-'}
                    </td>

                    <td>
                      {Number(vendedor.salario).toLocaleString(
                        'es-AR',
                        {
                          style: 'currency',
                          currency: 'ARS',
                          minimumFractionDigits: 2,
                        }
                      )}
                    </td>

                    <td>
                      <div className="flex flex-wrap items-center gap-4">
                        <Link
                          href={`/vendedores/${vendedor.id}/editar`}
                          className="link"
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
