
'use client';

import { useState } from 'react';
import { crearVendedor } from '@/lib/api';
import { crearVendedorSchema } from '@/schemas/vendedorSchema';

export default function NuevoVendedorPage() {
  const [personaId, setPersonaId] = useState('');
  const [salario, setSalario] = useState('');
  const [errores, setErrores] = useState({});
  const [errorAPI, setErrorAPI] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrores({});
    setErrorAPI('');
    setMensaje('');

    const datos = {
      persona_id: personaId === '' ? 0 : Number(personaId),
      salario,
      activo: true,
    };

    const resultado = crearVendedorSchema.safeParse(datos);

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

    setLoading(true);

    try {
      await crearVendedor(resultado.data);

      setMensaje('Vendedor creado correctamente');
      setPersonaId('');
      setSalario('');
    } catch (err) {
      setErrorAPI(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-lg p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Crear vendedor
      </h1>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-4"
      >
        <div>
          <label htmlFor="personaId" className="mb-1 block">
            ID del usuario
          </label>

          <input
            id="personaId"
            type="number"
            value={personaId}
            onChange={(e) => {
              setPersonaId(e.target.value);
              setErrores((prev) => ({
                ...prev,
                persona_id: undefined,
              }));
              setMensaje('');
            }}
            aria-invalid={Boolean(errores.persona_id)}
            className="w-full rounded border p-2"
          />

          {errores.persona_id && (
            <p className="mt-1 text-sm text-red-500">
              {errores.persona_id}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="salario" className="mb-1 block">
            Salario
          </label>

          <input
            id="salario"
            type="text"
            inputMode="decimal"
            placeholder="Ejemplo: 850000.50"
            value={salario}
            onChange={(e) => {
              setSalario(e.target.value);
              setErrores((prev) => ({
                ...prev,
                salario: undefined,
              }));
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

        {errorAPI && (
          <p role="alert" className="text-red-500">
            {errorAPI}
          </p>
        )}

        {mensaje && (
          <p role="status" className="text-green-600">
            {mensaje}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 p-3 text-white disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Crear vendedor'}
        </button>
      </form>
    </main>
  );
}
