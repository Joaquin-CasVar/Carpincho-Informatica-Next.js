
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { crearVendedor } from '@/lib/api';
import { crearVendedorSchema } from '@/schemas/vendedorSchema';
import UsuarioSelect from '@/components/gestion/UsuarioSelect';
import FormField from '@/components/gestion/FormField';

export default function NuevoVendedorPage() {
  const router = useRouter();

  const [personaId, setPersonaId] = useState('');
  const [salario, setSalario] = useState('');
  const [errores, setErrores] = useState({});
  const [errorAPI, setErrorAPI] = useState('');
  const [loading, setLoading] = useState(false);

  function cambiarUsuario(valor) {
    setPersonaId(valor);
    setErrores((prev) => ({ ...prev, persona_id: undefined }));
    setErrorAPI('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    setErrores({});
    setErrorAPI('');

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
      router.replace('/vendedores');
    } catch (err) {
      setErrorAPI(err.message || 'No se pudo crear el vendedor.');
      setLoading(false);
    }
  }

  return (
    <main className="card mx-auto w-full max-w-lg p-6 sm:p-8">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">
        Crear vendedor
      </h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <UsuarioSelect
          value={personaId}
          onChange={cambiarUsuario}
          error={errores.persona_id}
          disabled={loading}
        />

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
            setErrorAPI('');
          }}
          error={errores.salario}
          placeholder="Ejemplo: 850000.50"
          inputMode="decimal"
          disabled={loading}
        />

        {errorAPI && (
          <p role="alert" className="alert-error">
            {errorAPI}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? 'Guardando...' : 'Crear vendedor'}
        </button>
      </form>
    </main>
  );
}
