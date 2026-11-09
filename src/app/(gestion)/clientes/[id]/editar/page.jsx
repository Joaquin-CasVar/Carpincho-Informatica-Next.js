
'use client';

import { use, useEffect, useState } from 'react';
import { obtenerCliente, editarCliente } from '@/lib/api';
import { editarClienteSchema } from '@/schemas/clienteSchema';

export default function EditarClientePage({ params }) {
  const { id } = use(params);

  const [cliente, setCliente] = useState(null);
  const [direccion, setDireccion] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState({});

  useEffect(() => {
    let cancelado = false;

    async function cargarCliente() {
      setCargando(true);
      setError('');

      try {
        const data = await obtenerCliente(id);

        if (!cancelado) {
          setCliente(data);
          setDireccion(data.direccion ?? '');
        }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setMensaje('');
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
      setDireccion(resultado.data.direccion);
      setMensaje('Cliente actualizado correctamente');
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

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
          <strong>Usuario:</strong> {cliente.persona.username}
        </p>

        <p>
          <strong>Nombre:</strong>{' '}
          {cliente.persona.first_name}{' '}
          {cliente.persona.last_name}
        </p>

        <p>
          <strong>Email:</strong> {cliente.persona.email}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-4"
      >
        <div>
          <label htmlFor="direccion" className="mb-1 block">
            Dirección
          </label>

          <input
            id="direccion"
            type="text"
            value={direccion}
            onChange={(e) => {
              setDireccion(e.target.value);
              setErrores({});
              setMensaje('');
            }}
            aria-invalid={Boolean(errores.direccion)}
            className="w-full rounded border p-2"
          />

          {errores.direccion && (
            <p className="mt-1 text-sm text-red-500">
              {errores.direccion}
            </p>
          )}
        </div>

        {error && (
          <p role="alert" className="text-red-500">
            {error}
          </p>
        )}

        {mensaje && (
          <p role="status" className="text-green-600">
            {mensaje}
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
