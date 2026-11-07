
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { registrarCliente } from '@/lib/api';
import { registroSchema } from '@/schemas/registroSchema';

const datosIniciales = {
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  telefono: '',
  password: '',
  password2: '',
};

const campos = [
  { name: 'username', label: 'Nombre de usuario', type: 'text' },
  { name: 'first_name', label: 'Nombre', type: 'text' },
  { name: 'last_name', label: 'Apellido', type: 'text' },
  { name: 'email', label: 'Correo electrónico', type: 'email' },
  { name: 'telefono', label: 'Teléfono', type: 'tel' },
  { name: 'password', label: 'Contraseña', type: 'password' },
  {
    name: 'password2',
    label: 'Confirmar contraseña',
    type: 'password',
  },
];

export default function RegisterPage() {
  const [formulario, setFormulario] = useState(datosIniciales);
  const [errores, setErrores] = useState({});
  const [errorAPI, setErrorAPI] = useState('');
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));

    setErrores((anterior) => ({
      ...anterior,
      [name]: undefined,
    }));

    setErrorAPI('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setErrores({});
    setErrorAPI('');

    const resultado = registroSchema.safeParse(formulario);

    if (!resultado.success) {
      const nuevosErrores = {};

      resultado.error.issues.forEach((issue) => {
        const campo = issue.path[0];

        if (campo && !nuevosErrores[campo]) {
          nuevosErrores[campo] = issue.message;
        }
      });

      setErrores(nuevosErrores);
      return;
    }

    setCargando(true);

    try {
      await registrarCliente(resultado.data);

      setExito(true);
      setFormulario(datosIniciales);
    } catch (error) {
      setErrorAPI(error.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">
        Crear cuenta
      </h1>

      <p className="mb-6 text-sm opacity-70">
        Completá tus datos para registrarte en Carpincho Informática.
      </p>

      {exito ? (
        <div className="space-y-4 rounded-lg border p-6">
          <p role="status" className="text-green-500">
            ¡Tu cuenta fue creada correctamente!
          </p>

          <p>Ya podés iniciar sesión con tus credenciales.</p>

          <Link
            href="/account/login"
            className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Ir a iniciar sesión
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {campos.map((campo) => (
            <div key={campo.name}>
              <label
                htmlFor={campo.name}
                className="mb-1 block font-medium"
              >
                {campo.label}
              </label>

              <input
                id={campo.name}
                name={campo.name}
                type={campo.type}
                value={formulario[campo.name]}
                onChange={handleChange}
                autoComplete={
                  campo.name === 'password'
                    ? 'new-password'
                    : campo.name === 'password2'
                      ? 'new-password'
                      : 'on'
                }
                aria-invalid={Boolean(errores[campo.name])}
                aria-describedby={
                  errores[campo.name]
                    ? `${campo.name}-error`
                    : undefined
                }
                className="w-full rounded border bg-transparent px-3 py-2"
              />

              {errores[campo.name] && (
                <p
                  id={`${campo.name}-error`}
                  className="mt-1 text-sm text-red-500"
                >
                  {errores[campo.name]}
                </p>
              )}
            </div>
          ))}

          {errorAPI && (
            <p role="alert" className="text-sm text-red-500">
              {errorAPI}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full rounded bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {cargando ? 'Registrando...' : 'Crear cuenta'}
          </button>

          <p className="text-center text-sm">
            ¿Ya tenés una cuenta?{' '}
            <Link
              href="/account/login"
              className="text-blue-500 hover:underline"
            >
              Iniciar sesión
            </Link>
          </p>
        </form>
      )}
    </main>
  );
}
