import { getTipos_producto, getFabricantes, getColores } from "@/lib/api"

const tipos = await Promise.resolve(getTipos_producto())
const fabricantes = await Promise.resolve(getFabricantes())
const colores = await Promise.resolve(getColores())

const Minus = () => (
  <svg width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
  </svg>
)

function CategoryFilters({ filters, setFilters, category, name }) {

  const changeFilter = (value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  return (
    <div>
      <h1 className='text-2xl font-semibold'>
        {name.replace(/^./, char => char.toUpperCase())}
      </h1>

      <div className={'grid'}>
        <ul className='overflow-hidden'>
          {category.map((value, index) => (
            <li
              key={index}
              onClick={() => changeFilter(value.id)}
              className={
                `pl-4 cursor-pointer transition-all duration-200 hover:scale-105 
                ${filters[name] === value.id && 'text-lime-500'}`
              }
            >
              <p>{value.nombre}{value.tipo}</p>
            </li>
          ))}
          {filters[name] !== '' &&
            <li
              key={0}
              onClick={() => changeFilter('')}
              className="pl-4 cursor-pointer transition-all duration-200 hover:scale-105 flex items-center gap-2 hover:text-red-400"
            >
              <Minus />
              <p>Limpiar filtro</p>
            </li>
          }
          {
            category.length === 0 && (
              <li className='text-sm text-zinc-400 p-3'>
                No hay {name}
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

function SearchFilter({ setFilters }) {
  let searchValue = ''

  const changeFilter = (e) => {
    e.preventDefault();

    setFilters((prev) => ({
      ...prev,
      search: searchValue
    }))
  }

  return (
    <form className="flex gap-2 items-center" onSubmit={changeFilter}>

      <div className='relative w-full my-4'>
        <input
          type="text"
          placeholder='Producto, Fabricante'
          className='focus:outline-none p-2 focus:ring-2 ring-purple-400 rounded bg-zinc-600'
          onChange={(e) => searchValue = e.target.value}
        />
      </div>

      <button type="submit" className="cursor-pointer bg-zinc-300 p-3 rounded">
        <svg width="16" height="16" fill="currentColor" className="bi bi-search  text-zinc-600" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </button>
    </form>

  )
}

export default function Aside({ filters, setFilters }) {

  return (
    <aside className="w-72 py-8 px-6 border-r border-zinc-700">
      <div>
        <h1 className="text-2xl font-bold">Filtros</h1>
      </div>

      <SearchFilter setFilters={setFilters} />

      <div className="space-y-6 mt-8">
        <CategoryFilters filters={filters} setFilters={setFilters} category={tipos} name={'tipo'} />
        <CategoryFilters filters={filters} setFilters={setFilters} category={fabricantes} name={'fabricante'} />
        <CategoryFilters filters={filters} setFilters={setFilters} category={colores} name={'color'} />
      </div>


    </aside>
  )
}