import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

export default function SpendingChart() {
    const data = {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
          {
            label: "Spending",
            data: [400, 300, 450, 200, 350],
            borderColor: "#2563eb",
            backgroundColor: "rgba(37,99,235,0.2)", // Lighter fill color
            pointBackgroundColor: "#2563eb",
            pointBorderColor: "#fff",
            fill: true,
          },
        ],
      };
      

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Line data={data} options={options} />
  );
}