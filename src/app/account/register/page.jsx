
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { registrarCliente } from '@/lib/api';
import { registroSchema } from '@/schemas/registroSchema';
import { LogoMarca } from '@/components/Logo';

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
    <main className="card mx-4 my-12 p-6 sm:mx-auto sm:w-full sm:max-w-lg sm:p-8">
      <LogoMarca className="mb-6 size-12" />
      <h1 className="page-title mb-2">
        Crear cuenta
      </h1>

      <p className="mb-6 text-sm text-muted-foreground">
        Completá tus datos para registrarte en Carpincho Informática.
      </p>

      {exito ? (
        <div className="card space-y-4 p-6">
          <p role="status" className="alert-success">
            ¡Tu cuenta fue creada correctamente!
          </p>

          <p>Ya podés iniciar sesión con tus credenciales.</p>

          <Link
            href="/account/login"
            className="btn btn-primary"
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
                className="label"
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
                className="input"
              />

              {errores[campo.name] && (
                <p
                  id={`${campo.name}-error`}
                  className="field-error"
                >
                  {errores[campo.name]}
                </p>
              )}
            </div>
          ))}

          {errorAPI && (
            <p role="alert" className="field-error">
              {errorAPI}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="btn btn-primary w-full"
          >
            {cargando ? 'Registrando...' : 'Crear cuenta'}
          </button>

          <p className="text-center text-sm">
            ¿Ya tenés una cuenta?{' '}
            <Link
              href="/account/login"
              className="link"
            >
              Iniciar sesión
            </Link>
          </p>
        </form>
      )}
    </main>
  );
}
