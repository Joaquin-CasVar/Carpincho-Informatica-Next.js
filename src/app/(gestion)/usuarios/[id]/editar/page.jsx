
'use client';

import { use, useEffect, useState } from 'react';
import { obtenerUsuario, editarUsuario } from '@/lib/api';
import { editarUsuarioSchema } from '@/schemas/usuarioSchema';

export default function EditarUsuarioPage({ params }) {
  const { id } = use(params);

  const [form, setForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    telefono: '',
    activo: true,
  });

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState({});

  // Obtener los datos actuales del usuario
  useEffect(() => {
    let cancelado = false;

    async function cargarUsuario() {
      setCargando(true);
      setError('');

      try {
        const usuario = await obtenerUsuario(id);

        if (!cancelado) {
          setForm({
            username: usuario.username ?? '',
            first_name: usuario.first_name ?? '',
            last_name: usuario.last_name ?? '',
            email: usuario.email ?? '',
            telefono: usuario.telefono ?? '',
            activo: usuario.activo ?? true,
          });
        }
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

    cargarUsuario();

    return () => {
      cancelado = true;
    };
  }, [id]);

  // Actualizar los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setErrores((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    setMensaje('');
  };

  // Validar con Zod y enviar los cambios a Django
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setMensaje('');
    setErrores({});

    const resultado = editarUsuarioSchema.safeParse(form);

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
      await editarUsuario(id, resultado.data);

      setForm(resultado.data);
      setMensaje('Usuario actualizado correctamente');
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return <p className="p-6">Cargando usuario...</p>;
  }

  if (error && !form.username) {
    return (
      <p role="alert" className="p-6 text-red-500">
        {error}
      </p>
    );
  }

  const campos = [
    ['username', 'Nombre de usuario'],
    ['first_name', 'Nombre'],
    ['last_name', 'Apellido'],
    ['email', 'Correo electrónico'],
    ['telefono', 'Teléfono'],
  ];

  return (
    <main className="mx-auto max-w-lg p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Editar usuario #{id}
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
              type={name === 'email' ? 'email' : 'text'}
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

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="activo"
            checked={form.activo}
            onChange={handleChange}
          />

          Usuario activo
        </label>

        {error && (
          <p role="alert" className="text-red-500">
            {error}
          </p>
        )}

        {mensaje && (
          <p role="status" className="text-green-600">
            {mensaje}
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
