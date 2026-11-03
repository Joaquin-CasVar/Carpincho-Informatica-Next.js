export default function CpuForm({ form }) {
  const { register, formState: { errors } } = form

  const arquitecturas = [{ 'id': 1, 'nombre': 'Zen 5' }]
  const sockets = [{ 'id': 1, 'nombre': 'AM5', }]

  return (
    <form>
      <div className='mt-10 grid grid-cols-3 gap-3'>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Arquitectura<label className='text-sm text-red-800 animate-pulse'>{errors.arquitecturaId && "*" + errors.arquitecturaId.message}</label></p>
          <select
            className='cursor-pointer p-2 border border-zinc-600 rounded-md my-4'
            {...register("arquitecturaId", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar Arquitectura</option>

            {arquitecturas.map((arquitectura) => (
              <option key={arquitectura.id} value={arquitectura.id}>{arquitectura.nombre}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Socket<label className='text-sm text-red-800 animate-pulse'>{errors.socketId && "*" + errors.socketId.message}</label></p>
          <select
            className='cursor-pointer p-2 border border-zinc-600 rounded-md my-4'
            {...register("socketId", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar Socket</option>

            {sockets.map((socket) => (
              <option key={socket.id} value={socket.id}>{socket.nombre}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>N° de nucleos <label className='text-sm text-red-800 animate-pulse'>{errors.cant_nucleos && "*" + errors.cant_nucleos.message}</label></p>
          <input
            type="text"
            placeholder='Nucleos'
            className='p-2 border border-zinc-600 rounded-md my-4'
            {...register("cant_nucleos", { valueAsNumber: true })}
          />
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Frecuencia base <label className='text-sm text-red-800 animate-pulse'>{errors.velocidad_reloj && "*" + errors.velocidad_reloj.message}</label></p>
          <div className='p-2 border border-zinc-600 rounded-md my-4'>
            <input
              type="text"
              placeholder='1.1'
              className=''
              {...register("velocidad_reloj", { valueAsNumber: true })}
            />
            <span>Ghz</span>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Frecuencia boost <label className='text-sm text-red-800 animate-pulse'>{errors.velocidad_boost && "*" + errors.velocidad_boost.message}</label></p>
          <div className='p-2 border border-zinc-600 rounded-md my-4'>
            <input
              type="text"
              placeholder='1.1'
              className=''
              {...register("velocidad_boost", { valueAsNumber: true })}
            />
            <span>Ghz</span>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Caché <label className='text-sm text-red-800 animate-pulse'>{errors.cache && "*" + errors.cache.message}</label></p>
          <div className='p-2 border border-zinc-600 rounded-md my-4'>
            <input
              type="text"
              placeholder='8'
              className=''
              {...register("cache", { valueAsNumber: true })}
            />
            <span>MB</span>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>TDP <label className='text-sm text-red-800 animate-pulse'>{errors.tdp && "*" + errors.tdp.message}</label></p>
          <div className='p-2 border border-zinc-600 rounded-md my-4'>
            <input
              type="text"
              placeholder='0'
              className=''
              {...register("tdp", { valueAsNumber: true })}
            />
            <span>W</span>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Graficos integrados <label className='text-sm text-red-800 animate-pulse'>{errors.graficos_integrados && "*" + errors.graficos_integrados.message}</label></p>
          <input
            type="checkbox"
            placeholder=''
            className='p-2 border border-zinc-600 rounded-md my-4'
            {...register("graficos_integrados")}
          />
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Cooler incluido <label className='text-sm text-red-800 animate-pulse'>{errors.incluye_cooler && "*" + errors.incluye_cooler.message}</label></p>
          <input
            type="checkbox"
            placeholder=''
            className='p-2 border border-zinc-600 rounded-md my-4'
            {...register("incluye_cooler")}
          />
        </div>

      </div>
    </form>
  )
}
