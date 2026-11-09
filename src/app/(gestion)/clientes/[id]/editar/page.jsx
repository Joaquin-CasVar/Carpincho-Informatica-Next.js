
'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { obtenerCliente, editarCliente } from '@/lib/api';
import { editarClienteSchema } from '@/schemas/clienteSchema';
import FormField from '@/components/gestion/FormField';

export default function EditarClientePage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [cliente, setCliente] = useState(null);
  const [direccion, setDireccion] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [errores, setErrores] = useState({});

  useEffect(() => {
    let cancelado = false;

    async function cargarCliente() {
      try {
        const data = await obtenerCliente(id);

        if (cancelado) return;

        setCliente(data);
        setDireccion(data.direccion ?? '');
      } catch (err) {
        if (!cancelado) {
          setError(err.message);
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    }

    cargarCliente();

    return () => {
      cancelado = true;
    };
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (guardando) return;

    setError('');
    setErrores({});

    const resultado = editarClienteSchema.safeParse({
      direccion,
    });

    if (!resultado.success) {
      const erroresCampos = {};

      resultado.error.issues.forEach((issue) => {
        const campo = issue.path[0];

        if (campo && !erroresCampos[campo]) {
          erroresCampos[campo] = issue.message;
        }
      });

      setErrores(erroresCampos);
      return;
    }

    setGuardando(true);

    try {
      await editarCliente(id, resultado.data);
      router.replace('/clientes');
    } catch (err) {
      setError(err.message || 'No se pudo actualizar el cliente.');
      setGuardando(false);
    }
  }

  if (cargando) {
    return <p className="p-6">Cargando cliente...</p>;
  }

  if (!cliente) {
    return (
      <p role="alert" className="p-6 text-red-500">
        {error || 'No se encontró el cliente'}
      </p>
    );
  }

  return (
    <main className="mx-auto max-w-lg p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Editar cliente #{id}
      </h1>

      <div className="mb-6 rounded bg-gray-100 p-4 text-gray-900">
        <p>
          <strong>Usuario:</strong>{' '}
          {cliente.persona?.username || '-'}
        </p>

        <p>
          <strong>Nombre:</strong>{' '}
          {cliente.persona?.first_name || ''}{' '}
          {cliente.persona?.last_name || ''}
        </p>

        <p>
          <strong>Email:</strong>{' '}
          {cliente.persona?.email || '-'}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField
          id="direccion"
          name="direccion"
          label="Dirección"
          value={direccion}
          onChange={(e) => {
            setDireccion(e.target.value);
            setErrores((prev) => ({
              ...prev,
              direccion: undefined,
            }));
            setError('');
          }}
          error={errores.direccion}
          disabled={guardando}
        />

        {error && (
          <p role="alert" className="text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={guardando}
          className="w-full rounded bg-blue-600 p-3 text-white disabled:opacity-50"
        >
          {guardando ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </main>
  );
}
