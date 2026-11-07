"use client"

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"

import BarChart from "../components/BarChart"
import axios from "axios"

export default function page() {
  const [totalesMensuales, setTotalesMensuales] = useState([])
  const [ventasMensuales, setVentasMensuales] = useState([])
  const [vendedores, setVendedores] = useState([])
  const [totalesVendedor, setTotalesVendedor] = useState([])
  const [ventasVendedor, setVentasVendedor] = useState([])

  const date = new Date();

  // Por defecto se muestran estadisticas del año y mes actual
  const queryForm = useForm({
    defaultValues: {
      'year': date.getFullYear(),
      'month': date.getMonth() + 1,
    }
  })

  const { register, handleSubmit } = queryForm

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

  const fillGraphs = async (data) => {
    const token = sessionStorage.getItem('access')

    if (!token) throw new Error('Authentication credentials were not provided.')

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}ventas/estadisticas/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const stats = response.data
      
      console.log('query:', queryForm.getValues());

      setTotalesMensuales(stats.monthly_totals)
      setVentasMensuales(stats.monthly_sales)

      // Array con vendedor y su total de venta del mes
      setVendedores(
        stats.salesman_month_totals.map((vendedor) => {
          // Armo otro array con los nombres de los vendedores para etiquetar los graficos
          return vendedor[0]
        })
      )
      setTotalesVendedor(
        stats.salesman_month_totals.map((totales) => {
          // Armo otro array con los totales de venta, son los datos de un grafico
          return totales[1]
        })
      )
      setVentasVendedor(
        stats.salesman_month_sales.map((ventas) => {
          // Armo otro array con la cantidad de ventas, son los datos del otro grafico
          return ventas[1]
        })
      )
    } catch (error) {
      console.error(`Codigo de error: ${error.status}. ${error.response.data.detail}`)
    }
  }

  const onSubmit = async (data) => {
    fillGraphs(data)
  }

  useEffect(() => {
    fillGraphs(queryForm.getValues())
  }, [])

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
          data={totalesMensuales}
          lineColor={'68.5% 0.169 237.323'}
          title={"Total de venta mensual"}
          axis={'x'}
        />

        <BarChart
          barLabels={monthArray}
          dataLabel={'ventas/mes'}
          data={ventasMensuales}
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
          data={totalesVendedor}
          lineColor={'49.6% 0.265 301.924'}
          title={'Total por vendedor'}
          axis={'y'}
        />

        <BarChart
          barLabels={vendedores}
          dataLabel={'ventas/vendedor'}
          data={ventasVendedor}
          lineColor={'64.6% 0.222 41.116'}
          title={'Numero de ventas por vendedor'}
          axis={'y'}
        />
      </div>
    </div >
  )
}