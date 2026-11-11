"use client"

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import BarChart from "../components/BarChart"
import axios from "axios"

export default function page() {
  const [totalesMensuales, setTotalesMensuales] = useState([])
  const [ventasMensuales, setVentasMensuales] = useState([])
  const [vendedores, setVendedores] = useState([])
  const [totalesVendedor, setTotalesVendedor] = useState([])
  const [ventasVendedor, setVentasVendedor] = useState([])

  const router = useRouter();

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

    if (!token) router.push("/account/login")

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
    <div className="container-page flex flex-col gap-10 py-10">
      <div className="border-b border-border pb-6">
        <h1 className="page-title">Estadísticas</h1>
        <p className="page-subtitle">Cómo vienen las ventas de la tienda, por mes y por vendedor.</p>
      </div>

      <section className="flex flex-col gap-4">
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <h2 className="text-lg font-semibold">Por mes</h2>
          <label className='flex items-center gap-2 text-sm text-muted-foreground'>
            Año
            <select
              className='input w-auto cursor-pointer'
              {...register('year', {
                onChange: handleSubmit(onSubmit),
                valueAsNumber: true
              })}
            >

              <option value={2026}>2026</option>
              <option value={2025}>2025</option>

            </select>
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card p-5">
            <BarChart
              barLabels={monthArray}
              dataLabel={'$/mes'}
              data={totalesMensuales}
              title={"Total de venta mensual"}
              axis={'x'}
            />
          </div>

          <div className="card p-5">
            <BarChart
              barLabels={monthArray}
              dataLabel={'ventas/mes'}
              data={ventasMensuales}
              title={"Número de ventas mensual"}
              axis={'x'}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <h2 className="text-lg font-semibold">Por vendedor</h2>
          <label className='flex items-center gap-2 text-sm text-muted-foreground'>
            Mes
            <select
              className='input w-auto cursor-pointer'
              {...register('month', {
                onChange: handleSubmit(onSubmit),
                valueAsNumber: true
              })}
            >

              {monthArray.map((month, key) => (
                <option key={key} value={key + 1}>{month}</option>
              ))}

            </select>
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card p-5">
            <BarChart
              barLabels={vendedores}
              dataLabel={'$/vendedor'}
              data={totalesVendedor}
              title={'Total por vendedor'}
              axis={'y'}
            />
          </div>

          <div className="card p-5">
            <BarChart
              barLabels={vendedores}
              dataLabel={'ventas/vendedor'}
              data={ventasVendedor}
              title={'Número de ventas por vendedor'}
              axis={'y'}
            />
          </div>
        </div>
      </section>
    </div>
  )
}