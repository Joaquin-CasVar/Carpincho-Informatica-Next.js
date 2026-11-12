// Se muestra mientras una página de /ventas espera los datos de la API
export default function CargandoVentas() {
  return (
    <p className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      Cargando ventas...
    </p>
  );
}
