
'use client';

import { useEffect, useState } from 'react';
import { listarUsuarios } from '@/lib/api';

export default function UsuarioSelect({
    value,
    onChange,
    error,
    disabled = false,
    recargar = 0,
}) {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [errorCarga, setErrorCarga] = useState('');

    useEffect(() => {
        let cancelado = false;

        async function cargarUsuarios() {
        try {
            const encontrados = [];
            let pagina = 1;
            let siguiente = true;

            // Recorremos todas las páginas de la API.
            while (siguiente && !cancelado) {
            const data = await listarUsuarios(pagina);

            if (Array.isArray(data)) {
                encontrados.push(...data);
                siguiente = false;
            } else {
                encontrados.push(...(data.results ?? []));
                siguiente = Boolean(data.next);
                pagina += 1;
            }
            }

            if (!cancelado) {
            setUsuarios(encontrados);
            setErrorCarga('');
            }
        } catch (err) {
            if (!cancelado) {
            setUsuarios([]);
            setErrorCarga(
                err.message || 'No se pudieron cargar los usuarios.'
            );
            }
        } finally {
            if (!cancelado) {
            setCargando(false);
            }
        }
        }

        cargarUsuarios();

        return () => {
        cancelado = true;
        };
    }, [recargar]);

    return (
        <div>
        <label htmlFor="personaId" className="mb-1 block">
            Usuario asociado
        </label>

        <select
            id="personaId"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled || cargando || Boolean(errorCarga)}
            aria-invalid={Boolean(error)}
            aria-describedby={
            error ? 'personaId-error' : undefined
            }
            className="w-full rounded border p-2 disabled:opacity-50"
        >
            <option value="">
            {cargando
                ? 'Cargando usuarios...'
                : 'Seleccioná un usuario...'}
            </option>

            {usuarios.map((usuario) => {
            const nombre = [
                usuario.first_name,
                usuario.last_name,
            ].filter(Boolean).join(' ');

            return (
                <option key={usuario.id} value={usuario.id}>
                {nombre
                    ? `${nombre} (@${usuario.username})`
                    : `@${usuario.username}`}
                </option>
            );
            })}
        </select>

        {error && (
            <p
            id="personaId-error"
            role="alert"
            className="mt-1 text-sm text-red-500"
            >
            {error}
            </p>
        )}

        {errorCarga && (
            <p role="alert" className="mt-1 text-sm text-red-500">
            {errorCarga}
            </p>
        )}

        {!cargando && !errorCarga && usuarios.length === 0 && (
            <p className="mt-1 text-sm opacity-70">
            No hay usuarios disponibles.
            </p>
        )}
        </div>
    );
}
