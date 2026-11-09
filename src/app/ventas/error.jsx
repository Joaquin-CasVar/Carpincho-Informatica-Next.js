"use client";

// Se muestra si falla algo en /ventas (por ejemplo, la API apagada)
export default function ErrorVentas({ error, reset }) {
  return (
    <section>
      <h2>No se pudieron cargar las ventas</h2>
      <p>
        {error.message || "Ocurrió un error inesperado."} Verificá que la API
        esté funcionando.
      </p>
      <button
        type="button"
        onClick={() => reset()}
      >
        Reintentar
      </button>
    </section>
  );
}
