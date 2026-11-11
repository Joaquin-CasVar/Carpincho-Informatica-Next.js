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
      <h3 className='mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
        {name.replace(/^./, char => char.toUpperCase())}
      </h3>

      <div className='grid'>
        <ul className='flex flex-col gap-0.5'>
          {category.map((value, index) => (
            <li
              key={index}
              onClick={() => changeFilter(value.id)}
              className={
                `cursor-pointer rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  filters[name] === value.id
                    ? 'bg-accent font-medium text-accent-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`
              }
            >
              <p>{value.nombre}{value.tipo}</p>
            </li>
          ))}
          {filters[name] !== '' &&
            <li
              key={0}
              onClick={() => changeFilter('')}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-destructive transition-colors hover:bg-destructive/10"
            >
              <Minus />
              <p>Limpiar filtro</p>
            </li>
          }
          {
            category.length === 0 && (
              <li className='px-3 py-1.5 text-sm text-muted-foreground'>
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
    <form className="mt-5 flex items-center gap-2" onSubmit={changeFilter}>

      <div className='relative w-full'>
        <input
          type="text"
          placeholder='Producto, Fabricante'
          className='input'
          aria-label='Buscar productos'
          onChange={(e) => searchValue = e.target.value}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-icon shrink-0" aria-label="Buscar">
        <svg width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </button>
    </form>

  )
}

export default function Aside({ filters, setFilters }) {

  return (
    <aside className="card w-full shrink-0 p-5 lg:sticky lg:top-24 lg:w-64">
      <div>
        <h2 className="text-lg font-semibold">Filtros</h2>
      </div>

      <SearchFilter setFilters={setFilters} />

      <div className="mt-6 space-y-6">
        <CategoryFilters filters={filters} setFilters={setFilters} category={tipos} name={'tipo'} />
        <CategoryFilters filters={filters} setFilters={setFilters} category={fabricantes} name={'fabricante'} />
        <CategoryFilters filters={filters} setFilters={setFilters} category={colores} name={'color'} />
      </div>


    </aside>
  )
}