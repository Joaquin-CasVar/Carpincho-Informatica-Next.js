
'use client';

import { use, useEffect, useState } from 'react';
import { obtenerVendedor, editarVendedor } from '@/lib/api';
import { editarVendedorSchema } from '@/schemas/vendedorSchema';

export default function EditarVendedorPage({ params }) {
  const { id } = use(params);

  const [vendedor, setVendedor] = useState(null);
  const [salario, setSalario] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [errores, setErrores] = useState({});
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    let cancelado = false;

    async function cargarVendedor() {
      setCargando(true);
      setError('');

      try {
        const data = await obtenerVendedor(id);

        if (!cancelado) {
          setVendedor(data);
          setSalario(String(data.salario ?? ''));
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

    cargarVendedor();

    return () => {
      cancelado = true;
    };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setMensaje('');
    setErrores({});

    const resultado = editarVendedorSchema.safeParse({
      salario,
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
      await editarVendedor(id, resultado.data);

      setSalario(resultado.data.salario);
      setMensaje('Vendedor actualizado correctamente');
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return <p className="p-6">Cargando vendedor...</p>;
  }

  if (!vendedor) {
    return (
      <p role="alert" className="p-6 text-red-500">
        {error || 'No se encontró el vendedor'}
      </p>
    );
  }

  return (
    <main className="mx-auto max-w-lg p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Editar vendedor #{id}
      </h1>

      <div className="mb-6 rounded bg-gray-100 p-4 text-gray-900">
        <p>
          <strong>Usuario:</strong>{' '}
          {vendedor.persona.username}
        </p>

        <p>
          <strong>Nombre:</strong>{' '}
          {vendedor.persona.first_name}{' '}
          {vendedor.persona.last_name}
        </p>

        <p>
          <strong>Email:</strong>{' '}
          {vendedor.persona.email}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-4"
      >
        <div>
          <label htmlFor="salario" className="mb-1 block">
            Salario
          </label>

          <input
            id="salario"
            type="text"
            inputMode="decimal"
            value={salario}
            onChange={(e) => {
              setSalario(e.target.value);
              setErrores({});
              setMensaje('');
            }}
            aria-invalid={Boolean(errores.salario)}
            className="w-full rounded border p-2"
          />

          {errores.salario && (
            <p className="mt-1 text-sm text-red-500">
              {errores.salario}
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
