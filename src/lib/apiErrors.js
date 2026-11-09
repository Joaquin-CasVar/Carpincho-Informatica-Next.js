// Pasa los errores que devuelve la API (Django REST Framework) a React Hook Form.
// DRF responde por ejemplo: { cliente: ["Este campo es requerido."] },
// { non_field_errors: ["..."] } o { detail: "..." }.
export function aplicarErroresApi(dataError, setError, camposDelForm = []) {
  if (!dataError || typeof dataError !== "object") {
    setError("root.server", {
      message: "No se pudo conectar con el servidor. Intentá de nuevo.",
    });
    return;
  }

  Object.entries(dataError).forEach(([campo, mensajes]) => {
    const mensaje = Array.isArray(mensajes) ? mensajes.join(" ") : String(mensajes);

    if (camposDelForm.includes(campo)) {
      setError(campo, { message: mensaje });
    } else if (campo === "non_field_errors" || campo === "detail") {
      setError("root.server", { message: mensaje });
    } else {
      setError("root.server", { message: `${campo}: ${mensaje}` });
    }
  });
}
