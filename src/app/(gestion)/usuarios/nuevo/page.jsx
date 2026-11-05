
'use client';

import { useState } from 'react';
import { crearUsuario } from '@/lib/api';
import { crearUsuarioSchema } from '@/schemas/usuarioSchema';

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
  const [form, setForm] = useState(formularioInicial);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [errorAPI, setErrorAPI] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrores((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    setMensaje('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrores({});
    setErrorAPI('');
    setMensaje('');

    // Primero validamos con Zod
    const resultado = crearUsuarioSchema.safeParse(form);

    if (!resultado.success) {
      const erroresCampos = {};

      resultado.error.issues.forEach((error) => {
        const campo = error.path[0];

        if (campo && !erroresCampos[campo]) {
          erroresCampos[campo] = error.message;
        }
      });

      setErrores(erroresCampos);
      return;
    }

    // Si Zod acepta los datos, enviamos a Django
    setLoading(true);

    try {
      await crearUsuario(resultado.data);

      setMensaje('Usuario creado correctamente');
      setForm({ ...formularioInicial });
    } catch (err) {
      setErrorAPI(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-lg p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Crear usuario
      </h1>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-4"
      >
        {campos.map(([name, label]) => (
          <div key={name}>
            <label htmlFor={name} className="mb-1 block">
              {label}
            </label>

            <input
              id={name}
              name={name}
              type={
                name.includes('password')
                  ? 'password'
                  : name === 'email'
                    ? 'email'
                    : 'text'
              }
              value={form[name]}
              onChange={handleChange}
              aria-invalid={Boolean(errores[name])}
              aria-describedby={
                errores[name] ? `${name}-error` : undefined
              }
              className="w-full rounded border p-2"
            />

            {errores[name] && (
              <p
                id={`${name}-error`}
                className="mt-1 text-sm text-red-500"
              >
                {errores[name]}
              </p>
            )}
          </div>
        ))}

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
          {loading ? 'Guardando...' : 'Crear usuario'}
        </button>
      </form>
    </main>
  );
}
