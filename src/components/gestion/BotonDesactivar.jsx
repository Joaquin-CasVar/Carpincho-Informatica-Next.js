'use client';

import { useState } from 'react';

export default function BotonDesactivar({
    id,
    nombre,
    onDesactivar,
    onDesactivado,
}) {
    const [procesando, setProcesando] = useState(false);
    const [error, setError] = useState('');

    async function handleDesactivar() {
        const confirmado = window.confirm(
        `¿Estás seguro de que querés desactivar a ${nombre}?`
        );

        if (!confirmado) return;

        setProcesando(true);
        setError('');

        try {
        await onDesactivar(id);
        await onDesactivado?.();
        } catch (err) {
        setError(err.message || 'No se pudo desactivar el registro.');
        } finally {
        setProcesando(false);
        }
    }

    return (
        <div className="inline-flex flex-col gap-1">
        <button
            type="button"
            onClick={handleDesactivar}
            disabled={procesando}
            className="cursor-pointer font-medium text-destructive hover:underline disabled:opacity-50"
        >
            {procesando ? 'Desactivando...' : 'Desactivar'}
        </button>

        {error && (
            <span role="alert" className="text-xs text-destructive">
            {error}
            </span>
        )}
        </div>
    );
}