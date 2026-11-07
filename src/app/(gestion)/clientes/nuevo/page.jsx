
'use client';

import { useState } from 'react';
import { crearCliente } from '@/lib/api';
import { crearClienteSchema } from '@/schemas/clienteSchema';

export default function NuevoClientePage() {
  const [personaId, setPersonaId] = useState('');
  const [direccion, setDireccion] = useState('');
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
      direccion,
      activo: true,
    };

    // Validación con Zod
    const resultado = crearClienteSchema.safeParse(datos);

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
      await crearCliente(resultado.data);

      setMensaje('Cliente creado correctamente');
      setPersonaId('');
      setDireccion('');
    } catch (err) {
      setErrorAPI(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-lg p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Crear cliente
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
            min="1"
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
          <label htmlFor="direccion" className="mb-1 block">
            Dirección
          </label>

          <input
            id="direccion"
            type="text"
            value={direccion}
            onChange={(e) => {
              setDireccion(e.target.value);
              setErrores((prev) => ({
                ...prev,
                direccion: undefined,
              }));
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
          {loading ? 'Guardando...' : 'Crear cliente'}
        </button>
      </form>
    </main>
  );
}
