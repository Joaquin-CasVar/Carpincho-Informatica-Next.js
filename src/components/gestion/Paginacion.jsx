
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
            <p className="text-sm text-muted-foreground">
                Total de {nombreEntidad}: {total}
            </p>
            )}
        </div>

        <div className="flex gap-3">
            <button
            type="button"
            disabled={!hayAnterior || cargando}
            onClick={() => onCambiarPagina(Math.max(1, pagina - 1))}
            className="btn btn-secondary btn-sm"
            >
            Anterior
            </button>

            <button
            type="button"
            disabled={!haySiguiente || cargando}
            onClick={() => onCambiarPagina(pagina + 1)}
            className="btn btn-secondary btn-sm"
            >
            Siguiente
            </button>
        </div>
        </nav>
    );
}
