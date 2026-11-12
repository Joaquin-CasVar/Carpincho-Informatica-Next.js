
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  loginUsuario,
  verificarAdministrador,
} from '@/lib/api';
import { loginSchema } from '@/schemas/loginSchema';
import Link from 'next/link';
import { LogoMarca } from '@/components/Logo';

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
    <main className="card mx-4 my-12 p-6 sm:mx-auto sm:w-full sm:max-w-md sm:p-8">
      <LogoMarca className="mb-6 size-12" />
      <h1 className="page-title mb-6">
        Iniciar sesión
      </h1>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-4"
      >
        <div>
          <label htmlFor="username" className="label">
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
            className="input"
          />

          {errores.username && (
            <p className="field-error">
              {errores.username}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="label">
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
            className="input"
          />

          {errores.password && (
            <p className="field-error">
              {errores.password}
            </p>
          )}
        </div>

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
          {loading ? 'Ingresando...' : 'Iniciar sesión'}
        </button>

        <p className="text-center text-sm text-muted-foreground">
          ¿No tenés cuenta?{' '}
          <Link href="/account/register" className="link">
            Registrate
          </Link>
        </p>
      </form>
    </main>
  );
}
