export default function GpuForm({ form }) {
  const { register, formState: { errors } } = form

  const memorias = [{ 'id': 1, 'nombre': 'GDDR7' }]
  const chipsets = [{ 'id': 1, 'nombre': 'GeForce RTX 5090' }]
  const refrigeraciones = [{ 'id': 3, 'nombre': '3 ventiladores' }]

  return (
    <form>
      <div className='mt-10 grid grid-cols-3 gap-3'>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Tipo de Memoria<label className='text-sm text-red-800 animate-pulse'>{errors.memoriaId && "*" + errors.memoriaId.message}</label></p>
          <select
            className='cursor-pointer p-2 border border-zinc-600 rounded-md my-4'
            {...register("memoriaId", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar tipo de memoria</option>

            {memorias.map((memoria) => (
              <option key={memoria.id} value={memoria.id}>{memoria.nombre}</option>
            ))} 
          </select>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>GPU (Chipset)<label className='text-sm text-red-800 animate-pulse'>{errors.chipsetId && "*" + errors.chipsetId.message}</label></p>
          <select
            className='cursor-pointer p-2 border border-zinc-600 rounded-md my-4'
            {...register("chipsetId", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar GPU (Chipset)</option>

            {chipsets.map((chipset) => (
              <option key={chipset.id} value={chipset.id}>{chipset.nombre}</option>
            ))} 
          </select>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Refrigeración<label className='text-sm text-red-800 animate-pulse'>{errors.refrigeracionId && "*" + errors.refrigeracionId.message}</label></p>
          <select
            className='cursor-pointer p-2 border border-zinc-600 rounded-md my-4'
            {...register("refrigeracionId", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar Refrigeración</option>

            {refrigeraciones.map((refrigeracion) => (
              <option key={refrigeracion.id} value={refrigeracion.id}>{refrigeracion.nombre}</option>
            ))} 
          </select>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>GB de memoria <label className='text-sm text-red-800 animate-pulse'>{errors.memoria && "*" + errors.memoria.message}</label></p>
          <div className='p-2 border border-zinc-600 rounded-md my-4'>
            <input
              type="text"
              placeholder='Memoria'
              className=''
              {...register("memoria", { valueAsNumber: true })}
            />
            <span>GB</span>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Frecuencia base <label className='text-sm text-red-800 animate-pulse'>{errors.velocidad_reloj && "*" + errors.velocidad_reloj.message}</label></p>
          <div className='p-2 border border-zinc-600 rounded-md my-4'>
            <input
              type="text"
              placeholder='1010'
              className=''
              {...register("velocidad_reloj", { valueAsNumber: true })}
            />
            <span>Mhz</span>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Frecuencia boost <label className='text-sm text-red-800 animate-pulse'>{errors.velocidad_boost && "*" + errors.velocidad_boost.message}</label></p>
          <div className='p-2 border border-zinc-600 rounded-md my-4'>
            <input
              type="text"
              placeholder='1210'
              className=''
              {...register("velocidad_boost", { valueAsNumber: true })}
            />
            <span>Mhz</span>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Longitud <label className='text-sm text-red-800 animate-pulse'>{errors.longitud && "*" + errors.longitud.message}</label></p>
          <div className='p-2 border border-zinc-600 rounded-md my-4'>
            <input
              type="text"
              placeholder='100'
              className=''
              {...register("longitud", { valueAsNumber: true })}
            />
            <span>mm</span>
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
          <p className='text-zinc-400 text-lg'>Slots que ocupa <label className='text-sm text-red-800 animate-pulse'>{errors.ancho_slots && "*" + errors.ancho_slots.message}</label></p>
          <input
            type="text"
            placeholder='1.1'
            className='p-2 border border-zinc-600 rounded-md my-4'
            {...register("ancho_slots", { valueAsNumber: true })}
          />
        </div>

      </div>
    </form>
  )
}
