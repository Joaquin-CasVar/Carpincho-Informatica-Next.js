
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  loginUsuario,
  verificarAdministrador,
} from '@/lib/api';
import { loginSchema } from '@/schemas/loginSchema';

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [errores, setErrores] = useState({});
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

    setErrorAPI('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrores({});
    setErrorAPI('');

    const resultado = loginSchema.safeParse(form);

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
      const data = await loginUsuario(
        resultado.data.username,
        resultado.data.password
      );

      const permiso = await verificarAdministrador(data.access);

      // Almacenamiento provisional para desarrollo
      sessionStorage.setItem('access', data.access);
      sessionStorage.setItem('refresh', data.refresh);

      if (permiso === 'administrador') {
        router.replace('/admin');
      } else if (permiso === 'sin_permisos') {
        router.replace('/');
      } else {
        sessionStorage.removeItem('access');
        sessionStorage.removeItem('refresh');
        setErrorAPI('No se pudo validar la sesión.');
      }
    } catch (err) {
      setErrorAPI(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Iniciar sesión
      </h1>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-4"
      >
        <div>
          <label htmlFor="username" className="mb-1 block">
            Nombre de usuario
          </label>

          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
            aria-invalid={Boolean(errores.username)}
            className="w-full rounded border p-2"
          />

          {errores.username && (
            <p className="mt-1 text-sm text-red-500">
              {errores.username}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block">
            Contraseña
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            aria-invalid={Boolean(errores.password)}
            className="w-full rounded border p-2"
          />

          {errores.password && (
            <p className="mt-1 text-sm text-red-500">
              {errores.password}
            </p>
          )}
        </div>

        {errorAPI && (
          <p role="alert" className="text-red-500">
            {errorAPI}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 p-3 text-white disabled:opacity-50"
        >
          {loading ? 'Ingresando...' : 'Iniciar sesión'}
        </button>
      </form>
    </main>
  );
}
