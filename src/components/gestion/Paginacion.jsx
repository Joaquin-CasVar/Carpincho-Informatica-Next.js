
export default function Paginacion({
    pagina,
    total,
    nombreEntidad,
    hayAnterior,
    haySiguiente,
    cargando = false,
    onCambiarPagina,
}) {
    return (
        <nav
        aria-label={`Paginación de ${nombreEntidad}`}
        className="flex flex-wrap items-center justify-between gap-4"
        >
        <div>
            <p>Página {pagina}</p>

            {total !== null && (
            <p className="text-sm opacity-70">
                Total de {nombreEntidad}: {total}
            </p>
            )}
        </div>

        <div className="flex gap-3">
            <button
            type="button"
            disabled={!hayAnterior || cargando}
            onClick={() => onCambiarPagina(Math.max(1, pagina - 1))}
            className="rounded border px-4 py-2 disabled:opacity-40"
            >
            Anterior
            </button>

            <button
            type="button"
            disabled={!haySiguiente || cargando}
            onClick={() => onCambiarPagina(pagina + 1)}
            className="rounded border px-4 py-2 disabled:opacity-40"
            >
            Siguiente
            </button>
        </div>
        </nav>
    );
}
