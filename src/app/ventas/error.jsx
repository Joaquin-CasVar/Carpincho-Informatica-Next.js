"use client";

import Icon from "@/components/Icon";

// Se muestra si falla algo en /ventas (por ejemplo, la API apagada)
export default function ErrorVentas({ error, reset }) {
  return (
    <section className="card flex flex-col items-center gap-4 px-6 py-14 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
        <Icon name="alerta" className="size-6" />
      </span>
      <h2 className="text-xl font-semibold">No se pudieron cargar las ventas</h2>
      <p className="max-w-md text-sm text-muted-foreground">
        {error.message || "Ocurrió un error inesperado."} Verificá que la API
        esté funcionando.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="btn btn-primary"
      >
        Reintentar
      </button>
    </section>
  );
}
