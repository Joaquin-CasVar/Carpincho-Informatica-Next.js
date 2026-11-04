"use client"

import { useForm } from "react-hook-form"

import { getStats } from "@/lib/stats"
import BarChart from "../components/BarChart"

export default function page() {
  const estadisticas = getStats()

  const date = new Date();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      'month': date.getMonth() + 1,
      'year': date.getFullYear(),
    }
  })

  const monthArray = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]

  // Array con vendedor y su total de venta del mes
  const vendedores = estadisticas.salesman_month_totals.map((vendedor) => {
    // Armo otro array con los nombres de los vendedores para etiquetar los graficos
    return vendedor[0]
  })

  const month_totals = estadisticas.salesman_month_totals.map((totales) => {
    // Armo otro array con los totales de venta, son los datos de un grafico
    return totales[1]
  })

  const month_sales = estadisticas.salesman_month_sales.map((ventas) => {
    // Armo otro array con la cantidad de ventas, son los datos del otro grafico
    return ventas[1]
  })

  const onSubmit = async (data) => {
    console.log(data);

  }

  return (
    <div>
      <h1 className="text-9xl">Estadísticas</h1>

      <div className="max-w-2xl flex flex-col gap-4 mb-8">
        <div className='flex items-center gap-1'>
          <p className='text-zinc-400 text-lg'>Año: </p>
          <select
            className='cursor-pointer p-2 border border-zinc-600 rounded-md'
            {...register('year', {
              onChange: handleSubmit(onSubmit),
              valueAsNumber: true
            })}
          >

            <option value={2026}>2026</option>
            <option value={2025}>2025</option>

          </select>
        </div>

        <BarChart
          barLabels={monthArray}
          dataLabel={'$/mes'}
          data={estadisticas.monthly_totals}
          lineColor={'68.5% 0.169 237.323'}
          title={"Total de venta mensual"}
          axis={'x'}
        />

        <BarChart
          barLabels={monthArray}
          dataLabel={'ventas/mes'}
          data={estadisticas.monthly_sales}
          lineColor={'62.7% 0.194 149.214'}
          title={"Numero de ventas mensual"}
          axis={'x'}
        />
      </div>

      <div className="max-w-2xl flex flex-col gap-4">
        <div className='flex items-center gap-1'>
          <p className='text-zinc-400 text-lg'>Mes: </p>
          <select
            className='cursor-pointer p-2 border border-zinc-600 rounded-md'
            {...register('month', {
              onChange: handleSubmit(onSubmit),
              valueAsNumber: true
            })}
          >

            {monthArray.map((month, key) => (
              <option key={key} value={key + 1}>{month}</option>
            ))}

          </select>
        </div>

        <BarChart
          barLabels={vendedores}
          dataLabel={'$/vendedor'}
          data={month_totals}
          lineColor={'49.6% 0.265 301.924'}
          title={'Total por vendedor'}
          axis={'y'}
        />

        <BarChart
          barLabels={vendedores}
          dataLabel={'ventas/vendedor'}
          data={month_sales}
          lineColor={'64.6% 0.222 41.116'}
          title={'Numero de ventas por vendedor'}
          axis={'y'}
        />
      </div>
    </div >
  )
}