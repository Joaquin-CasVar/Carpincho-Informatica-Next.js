export default function CpuSpecs({ specs }) {

  return (
    <div>
      <p>Nucleos: {specs.cant_nucleos}</p>
      <p>Frecuencia base: {specs.velocidad_reloj} Ghz</p>
      <p>Frecuencia boost: {specs.velocidad_boost} Ghz</p>
      <p>Graficos integrados: {specs.graficos_integrados ? 'Si' : 'No'}</p>
      <p>Caché: {specs.cache} MB</p>
      <p>Cooler incluido: {specs.incluye_cooler ? 'Si' : 'No'}</p>
      <p>TDP: {specs.tdp} W</p>
      <p>Arquitectura: {specs.arquitectura.nombre}</p>
      <p>Socket: {specs.socket.nombre}</p>

    </div>
  )
}
