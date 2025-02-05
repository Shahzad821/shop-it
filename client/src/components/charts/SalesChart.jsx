import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SalesChart({ salesData }) {
  // Extract labels (dates) and datasets (sales and orders)
  const labels = salesData?.map((item) => item.date);
  const sales = salesData?.map((item) => item.sales);
  const orders = salesData?.map((item) => item.numberOfOrders);

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Sales & Order Data",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  // Prepare chart data
  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: sales, // Use the extracted sales data
        borderColor: "#198753",
        backgroundColor: "rgba(42, 117, 83, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Orders",
        data: orders, // Use the extracted orders data
        borderColor: "rgb(220, 52, 69)",
        backgroundColor: "rgba(201, 68, 82, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
