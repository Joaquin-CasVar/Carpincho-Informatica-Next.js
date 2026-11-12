
'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { obtenerUsuario, editarUsuario } from '@/lib/api';
import { editarUsuarioSchema } from '@/schemas/usuarioSchema';
import FormField from '@/components/gestion/FormField';

const campos = [
  ['username', 'Nombre de usuario'],
  ['first_name', 'Nombre'],
  ['last_name', 'Apellido'],
  ['email', 'Correo electrónico'],
  ['telefono', 'Teléfono'],
];

export default function EditarUsuarioPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

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
  const [errores, setErrores] = useState({});
  const [usuarioCargado, setUsuarioCargado] = useState(false);

  useEffect(() => {
    let cancelado = false;

    async function cargarUsuario() {
      try {
        const usuario = await obtenerUsuario(id);

        if (cancelado) return;

        setForm({
          username: usuario.username ?? '',
          first_name: usuario.first_name ?? '',
          last_name: usuario.last_name ?? '',
          email: usuario.email ?? '',
          telefono: usuario.telefono ?? '',
          activo: usuario.activo ?? true,
        });

        setUsuarioCargado(true);
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

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setErrores((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (guardando) return;

    setError('');
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
      router.replace('/usuarios');
    } catch (err) {
      setError(err.message || 'No se pudo actualizar el usuario.');
      setGuardando(false);
    }
  }

  if (cargando) {
    return <p className="flex items-center gap-2 py-6 text-sm text-muted-foreground">Cargando usuario...</p>;
  }

  if (!usuarioCargado) {
    return (
      <p role="alert" className="alert-error">
        {error || 'No se encontró el usuario'}
      </p>
    );
  }

  return (
    <main className="card mx-auto w-full max-w-lg p-6 sm:p-8">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">
        Editar usuario #{id}
      </h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {campos.map(([name, label]) => (
          <FormField
            key={name}
            id={name}
            name={name}
            label={label}
            type={name === 'email' ? 'email' : 'text'}
            value={form[name]}
            onChange={handleChange}
            error={errores[name]}
            disabled={guardando}
          />
        ))}

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="activo"
            checked={form.activo}
            onChange={handleChange}
            disabled={guardando}
          />
          Usuario activo
        </label>

        {error && (
          <p role="alert" className="alert-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={guardando}
          className="btn btn-primary w-full"
        >
          {guardando ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </main>
  );
}
