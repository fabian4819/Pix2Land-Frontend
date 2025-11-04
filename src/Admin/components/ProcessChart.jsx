import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

//komponen legenda
const LegendItem = ({ color, label }) => (
  <div className="flex items-center space-x-2">
    <div className={`w-4 h-4 rounded-sm ${color}`}></div>
    <span className="text-sm text-gray-600">{label}</span>
  </div>
);

const ProcessChart = ({
  data = { berhasil: 0, belum: 0, batal: 0, gagal: 0 },
}) => {
  const chartData = {
    labels: ["Berhasil", "Belum", "Batal", "Gagal"],
    datasets: [
      {
        label: "Jumlah Dokumen",
        data: [data.Berhasil, data.Belum, data.Batal, data.Gagal],
        backgroundColor: [
          "#3B82F6", //Berhasil (biru)
          "#F59E0B", //Belum (kuning)
          "#EF4444", //Batal (merah)
          "#374151", //Gagal (hitam)
        ],
        borderColor: "#FFFFFF",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true, // Membuat chart responsif
    maintainAspectRatio: false, // Penting agar chart bisa mengisi container
    cutout: "80%", // Ini yang membuat lubang di tengah (Donut)
    plugins: {
      legend: {
        display: false, // Kita sembunyikan legenda bawaan Chart.js
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="font-bold text-gray-700 border-b pb-2 mb-4 text-center">
        PERSENTASE DATA PROSES
      </h3>

      {/* 5. GANTI 'div' CSS DENGAN KOMPONEN CHART.JS */}
      <div className="relative w-48 h-48 mx-auto my-8">
        <Doughnut data={chartData} options={chartOptions} />
      </div>

      {/* 6. Legenda kustom Anda (ini tidak berubah) */}
      <div className="flex justify-around">
        <LegendItem color="bg-blue-500" label="Berhasil" />
        <LegendItem color="bg-yellow-500" label="Belum" />
        <LegendItem color="bg-red-500" label="Batal" />
        <LegendItem color="bg-gray-800" label="Gagal" />
      </div>
    </div>
  );
};

export default ProcessChart;
