
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { crearUsuario } from '@/lib/api';
import { crearUsuarioSchema } from '@/schemas/usuarioSchema';
import FormField from '@/components/gestion/FormField';

const formularioInicial = {
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  telefono: '',
  password: '',
  password2: '',
};

const campos = [
  ['username', 'Nombre de usuario'],
  ['first_name', 'Nombre'],
  ['last_name', 'Apellido'],
  ['email', 'Email'],
  ['telefono', 'Teléfono'],
  ['password', 'Contraseña'],
  ['password2', 'Confirmar contraseña'],
];

export default function NuevoUsuarioPage() {
  const router = useRouter();

  const [form, setForm] = useState(formularioInicial);
  const [errores, setErrores] = useState({});
  const [errorAPI, setErrorAPI] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: undefined }));
    setErrorAPI('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    setErrores({});
    setErrorAPI('');

    const resultado = crearUsuarioSchema.safeParse(form);

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
      await crearUsuario(resultado.data);
      router.replace('/usuarios');
    } catch (err) {
      setErrorAPI(err.message || 'No se pudo crear el usuario.');
      setLoading(false);
    }
  }

  return (
    <main className="card mx-auto w-full max-w-lg p-6 sm:p-8">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">
        Crear usuario
      </h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {campos.map(([name, label]) => (
          <FormField
            key={name}
            id={name}
            name={name}
            label={label}
            type={
              name.includes('password')
                ? 'password'
                : name === 'email'
                  ? 'email'
                  : 'text'
            }
            value={form[name]}
            onChange={handleChange}
            error={errores[name]}
            disabled={loading}
          />
        ))}

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
          {loading ? 'Guardando...' : 'Crear usuario'}
        </button>
      </form>
    </main>
  );
}
