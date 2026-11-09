
'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { obtenerVendedor, editarVendedor } from '@/lib/api';
import { editarVendedorSchema } from '@/schemas/vendedorSchema';
import FormField from '@/components/gestion/FormField';

export default function EditarVendedorPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [vendedor, setVendedor] = useState(null);
  const [salario, setSalario] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [errores, setErrores] = useState({});

  useEffect(() => {
    let cancelado = false;

    async function cargarVendedor() {
      try {
        const data = await obtenerVendedor(id);

        if (cancelado) return;

        setVendedor(data);
        setSalario(String(data.salario ?? ''));
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

  async function handleSubmit(e) {
    e.preventDefault();

    if (guardando) return;

    setError('');
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
      router.replace('/vendedores');
    } catch (err) {
      setError(err.message || 'No se pudo actualizar el vendedor.');
      setGuardando(false);
    }
  }

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
          {vendedor.persona?.username || '-'}
        </p>

        <p>
          <strong>Nombre:</strong>{' '}
          {vendedor.persona?.first_name || ''}{' '}
          {vendedor.persona?.last_name || ''}
        </p>

        <p>
          <strong>Email:</strong>{' '}
          {vendedor.persona?.email || '-'}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField
          id="salario"
          name="salario"
          label="Salario"
          value={salario}
          onChange={(e) => {
            setSalario(e.target.value);
            setErrores((prev) => ({
              ...prev,
              salario: undefined,
            }));
            setError('');
          }}
          error={errores.salario}
          placeholder="Ejemplo: 850000.50"
          inputMode="decimal"
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
