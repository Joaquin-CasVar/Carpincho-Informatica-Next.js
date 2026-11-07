
'use client';

import { useState } from 'react';
import { contactoSchema } from '@/schemas/contactoSchema';

const formularioInicial = {
  nombre: '',
  email: '',
  asunto: '',
  mensaje: '',
};

const campos = [
  ['nombre', 'Nombre'],
  ['email', 'Correo electrónico'],
  ['asunto', 'Asunto'],
];

export default function ContactoPage() {
  const [form, setForm] = useState(formularioInicial);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrores({});
    setMensaje('');

    // Validar el formulario usando Zod
    const resultado = contactoSchema.safeParse(form);

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

    // Todavía no existe un endpoint para enviar consultas
    setMensaje(
      'Los datos son válidos. El envío de consultas todavía no está habilitado.'
    );
  };

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Contacto
        </h1>

        <p className="mt-2">
          ¿Tenés alguna consulta sobre nuestros productos?
          Completá el formulario para verificar los datos.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="max-w-lg space-y-4"
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

        <div>
          <label htmlFor="mensaje" className="mb-1 block">
            Mensaje
          </label>

          <textarea
            id="mensaje"
            name="mensaje"
            rows={5}
            value={form.mensaje}
            onChange={handleChange}
            aria-invalid={Boolean(errores.mensaje)}
            aria-describedby={
              errores.mensaje ? 'mensaje-error' : undefined
            }
            className="w-full rounded border p-2"
          />

          {errores.mensaje && (
            <p
              id="mensaje-error"
              className="mt-1 text-sm text-red-500"
            >
              {errores.mensaje}
            </p>
          )}
        </div>

        {mensaje && (
          <p role="status" className="text-amber-600">
            {mensaje}
          </p>
        )}

        <button
          type="submit"
          className="rounded bg-blue-600 px-6 py-3 text-white"
        >
          Enviar consulta
        </button>
      </form>
    </main>
  );
}
