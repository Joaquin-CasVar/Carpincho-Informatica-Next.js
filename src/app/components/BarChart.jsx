"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

import { Bar } from "react-chartjs-2"
import { useTheme } from "@/context/ThemeContext"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

// Colores del gráfico según el tema (vienen del ThemeContext).
// Las barras usan el naranja de la marca, validado para cada fondo.
const COLORES = {
  claro: { barra: "#b45000", texto: "#605954", titulo: "#1c1917", grilla: "rgba(28, 25, 23, 0.08)" },
  oscuro: { barra: "#d36d00", texto: "#aaa39d", titulo: "#f4f1ed", grilla: "rgba(244, 241, 237, 0.08)" },
}

export default function BarChart({barLabels, dataLabel, data, lineColor, title, axis }) {
  const { tema } = useTheme()
  const colores = COLORES[tema]

  const barData = {
    labels: barLabels,
    datasets: [{
      label: dataLabel,
      data: data,
      backgroundColor: lineColor ? `oklch(${lineColor})` : colores.barra,
      borderWidth: 0,
      borderRadius: 4,
      borderSkipped: "start",
      maxBarThickness: 24,
    }]
  }

  // Eje de las categorías (meses o vendedores) y eje de los valores
  const ejeCategorias = { ticks: { color: colores.texto }, grid: { display: false }, border: { display: false } }
  const ejeValores = { beginAtZero: true, ticks: { color: colores.texto }, grid: { color: colores.grilla }, border: { display: false } }

  const options = {
    indexAxis: axis,
    responsive: true,
    plugins: {
      // Una sola serie: el título ya dice qué se muestra, no hace falta leyenda
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        align: "start",
        color: colores.titulo,
        font: {
          size: 16,
          weight: "600",
        },
        padding: { bottom: 16 },
      },
    },
    scales: axis === "y"
      ? { x: ejeValores, y: ejeCategorias }
      : { x: ejeCategorias, y: ejeValores },
  };

  return (
    <Bar data={barData} options={options} />
  )
}
