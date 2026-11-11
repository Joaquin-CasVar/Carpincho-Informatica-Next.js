const fila = "flex justify-between gap-4 border-b border-border py-2.5 text-sm"

export default function CpuSpecs({ specs }) {

  return (
    <div className="grid gap-x-10 sm:grid-cols-2">
      <p className={fila}><span className="text-muted-foreground">Núcleos</span><span className="font-medium">{specs.cant_nucleos}</span></p>
      <p className={fila}><span className="text-muted-foreground">Frecuencia base</span><span className="font-medium">{specs.velocidad_reloj} Ghz</span></p>
      <p className={fila}><span className="text-muted-foreground">Frecuencia boost</span><span className="font-medium">{specs.velocidad_boost} Ghz</span></p>
      <p className={fila}><span className="text-muted-foreground">Gráficos integrados</span><span className="font-medium">{specs.graficos_integrados ? 'Si' : 'No'}</span></p>
      <p className={fila}><span className="text-muted-foreground">Caché</span><span className="font-medium">{specs.cache} MB</span></p>
      <p className={fila}><span className="text-muted-foreground">Cooler incluido</span><span className="font-medium">{specs.incluye_cooler ? 'Si' : 'No'}</span></p>
      <p className={fila}><span className="text-muted-foreground">TDP</span><span className="font-medium">{specs.tdp} W</span></p>
      <p className={fila}><span className="text-muted-foreground">Arquitectura</span><span className="font-medium">{specs.arquitectura.nombre}</span></p>
      <p className={fila}><span className="text-muted-foreground">Socket</span><span className="font-medium">{specs.socket.nombre}</span></p>
    </div>
  )
}
