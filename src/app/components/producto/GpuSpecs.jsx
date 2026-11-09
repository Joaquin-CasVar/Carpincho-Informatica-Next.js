export default function GpuSpecs({ specs }) {
  return (
    <div>
      <p>GPU: {specs.chipset.nombre}</p>
      <p>Memoria: {specs.memoria}GB {specs.tipo_memoria.nombre}</p>
      <p>Frecuencia base: {specs.velocidad_reloj}Mhz</p>
      <p>Frecuencia boost: {specs.velocidad_boost}Mhz</p>
      <p>Longitud: {specs.longitud}mm</p>
      <p>TDP: {specs.tdp}W</p>
      <p>Refrigeración: {specs.refrigeracion.nombre}</p>
      <p>Slots que ocupa: {specs.ancho_slots}</p>
    </div>
  )
}
