const fabricantes = [
  {
    "id": 1,
    "nombre": "AMD"
  },
  {
    "id": 2,
    "nombre": "Intel"
  }
]


function Category({ category, name }) {
  return (
    <div>

        <h1 className='text-2xl font-semibold'>
          {name}
        </h1>
      
      <div className={'grid'}>
        <ul className=' overflow-hidden'>
          {category.map((value, index) => (
            <li key={index} className="pl-4 cursor-pointer transition-all duration-200 hover:scale-105">
              <p > {value.nombre} </p>
            </li>
          ))}
          {
            category.length === 0 && (
              <li className='text-sm text-zinc-400 p-3'>
                No hay notas
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default function Aside() {
  return (
    <aside className="w-72 py-8 px-6 border-r border-zinc-700">
      <div>
        <h1 className="text-2xl font-bold">Filtrar por</h1>
      </div>

      <div className='relative w-full my-4'>

        <svg width="16" height="16" fill="currentColor" className="bi bi-search absolute left-3 top-3 text-zinc-400" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>

        <input
          type="text"
          placeholder='Filtros de busqueda'
          className='focus:outline-none p-2 focus:ring-2 ring-green-400 rounded pl-9 bg-zinc-600'
        />
      </div>

      <div className="space-y-6 mt-8">
        <Category category={fabricantes} name={'Fabricantes'} />
      </div>


    </aside>
  )
}