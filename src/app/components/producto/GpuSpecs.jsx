const fila = "flex justify-between gap-4 border-b border-border py-2.5 text-sm"

export default function GpuSpecs({ specs }) {
  return (
    <div className="grid gap-x-10 sm:grid-cols-2">
      <p className={fila}><span className="text-muted-foreground">GPU</span><span className="font-medium">{specs.chipset.nombre}</span></p>
      <p className={fila}><span className="text-muted-foreground">Memoria</span><span className="font-medium">{specs.memoria}GB {specs.tipo_memoria.nombre}</span></p>
      <p className={fila}><span className="text-muted-foreground">Frecuencia base</span><span className="font-medium">{specs.velocidad_reloj}Mhz</span></p>
      <p className={fila}><span className="text-muted-foreground">Frecuencia boost</span><span className="font-medium">{specs.velocidad_boost}Mhz</span></p>
      <p className={fila}><span className="text-muted-foreground">Longitud</span><span className="font-medium">{specs.longitud}mm</span></p>
      <p className={fila}><span className="text-muted-foreground">TDP</span><span className="font-medium">{specs.tdp}W</span></p>
      <p className={fila}><span className="text-muted-foreground">Refrigeración</span><span className="font-medium">{specs.refrigeracion.nombre}</span></p>
      <p className={fila}><span className="text-muted-foreground">Slots que ocupa</span><span className="font-medium">{specs.ancho_slots}</span></p>
    </div>
  )
}
