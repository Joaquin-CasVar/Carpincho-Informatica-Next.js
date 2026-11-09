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

export default function BarChart({barLabels, dataLabel, data, lineColor, title, axis }) {
  ChartJS.defaults.color = '#ffffff'
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

  const barData = {
    labels: barLabels,
    datasets: [{
      label: dataLabel,
      data: data,
      backgroundColor: `oklch(${lineColor} / 0.6)`,
      borderColor: `oklch(${lineColor})`,
      borderWidth: 1,
    }]
  }

  const options = {
    indexAxis: axis,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 20
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };



  return (
    <Bar data={barData} options={options} className="bg-zinc-800 border border-zinc-700" />
  )
}