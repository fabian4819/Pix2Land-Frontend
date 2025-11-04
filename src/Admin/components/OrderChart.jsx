import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// 2. Registrasi elemen-elemen untuk Bar chart
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// 3. Terima props 'data' { satuan: 0, bundle: 0 }
const OrderChart = ({ data = { satuan: 0, bundle: 0 } }) => {
  const chartData = {
    labels: ["Satuan", "Bundle"],
    datasets: [
      {
        label: "Jumlah Order",
        // 4. Gunakan data dari props
        data: [data.satuan, data.bundle],
        backgroundColor: [
          "#3B82F6", // Warna untuk Satuan
          "#10B981", // Warna untuk Bundle
        ],
        borderColor: ["#3B82F6", "#10B981"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Tidak perlu legenda, label sudah jelas
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Mulai sumbu Y dari 0
        ticks: {
          // Pastikan hanya angka bulat (integer) di sumbu Y
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="font-bold text-gray-700 border-b pb-2 mb-4 text-center">
        JUMLAH JENIS ORDER
      </h3>

      {/* 5. Gunakan container dengan tinggi yang pas untuk Bar chart */}
      <div className="relative h-48 mx-auto my-8">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* 6. Kita tidak perlu legenda kustom untuk chart ini */}
    </div>
  );
};

export default OrderChart;
