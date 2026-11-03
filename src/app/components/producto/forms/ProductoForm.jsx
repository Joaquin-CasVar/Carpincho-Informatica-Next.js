export default function ProductoForm({ form }) {
  const { register, formState: { errors } } = form

  const fabricantes = [{ 'id': 1, 'nombre': 'AMD' }]
  const colores = [{ 'id': 1, 'nombre': 'Negro' }]

  const tipos = [
    {
      'id': 1,
      'tipo': 'CPU'
    },
    {
      'id': 2,
      'tipo': 'GPU'
    }
  ]

  return (

    <form >
      <div className='mt-10 grid grid-cols-3 gap-3'>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Nombre <label className='text-sm text-red-800 animate-pulse'>{errors.nombre && "*" + errors.nombre.message}</label></p>
          <input
            type="text"
            placeholder='Nombre'
            className='p-2 border border-zinc-600 rounded-md my-4'
            {...register("nombre")}
          />
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Precio <label className='text-sm text-red-800 animate-pulse'>{errors.precio && "*" + errors.precio.message}</label></p>
          <div className='p-2 border border-zinc-600 rounded-md my-4'>
            <span>$</span>
            <input
              type="number"
              placeholder='0.00'
              className=""
              {...register("precio", { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <p className='text-zinc-400 text-lg'>Stock <label className='text-sm text-red-800 animate-pulse'>{errors.stock && "*" + errors.stock.message}</label></p>

          <input
            type="number"
            placeholder="0"
            className='p-2 border border-zinc-600 rounded-md my-4'
            {...register('stock', { valueAsNumber: true })}
          />
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Fabricante <label className='text-sm text-red-800 animate-pulse'>{errors.fabricanteId && "*" + errors.fabricanteId.message}</label></p>
          <select
            className='cursor-pointer p-2 border border-zinc-600 rounded-md my-4'
            {...register("fabricanteId", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar Fabricante</option>

            {fabricantes.map((fabricante) => (
              <option key={fabricante.id} value={fabricante.id}>{fabricante.nombre}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Color <label className='text-sm text-red-800 animate-pulse'>{errors.colorId && "*" + errors.colorId.message}</label></p>
          <select
            className='cursor-pointer p-2 border border-zinc-600 rounded-md my-4'
            {...register("colorId", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar Color</option>

            {colores.map((color) => (
              <option key={color.id} value={color.id}>{color.nombre}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <p className='text-zinc-400 text-lg'>Tipo <label className='text-sm text-red-800 animate-pulse'>{errors.tipoId && "*" + errors.tipoId.message}</label></p>
          <select
            className='cursor-pointer p-2 border border-zinc-600 rounded-md my-4'
            {...register("tipoId", { valueAsNumber: true })}
          >

            <option value={0} disabled={true} >Seleccionar Tipo</option>

            {tipos.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>{tipo.tipo}</option>
            ))}
          </select>

          <div className='flex flex-col'>
            <p className='text-zinc-400 text-lg'>Imagen <label className='text-sm text-red-800 animate-pulse'>{errors.imagen && "*" + errors.imagen.message}</label></p>
            <input
              type="text"
              placeholder='https://link/de/la/imagen.com'
              className="p-2 border border-zinc-600 rounded-md my-4"
              {...register("imagen")}
            />
          </div>

        </div>

      </div>
    </form>
  )
}