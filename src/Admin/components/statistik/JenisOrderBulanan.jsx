import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { getDynamicMonths } from "../utils/statistikUtils";

Chart.register(ArcElement, Tooltip, Legend);

const LegendItem = ({ color, label }) => (
  <div className="flex items-center space-x-2">
    <div className={`w-4 h-4 rounded-sm ${color}`}></div>
    <span className="text-sm text-gray-600">{label}</span>
  </div>
);

export default function JenisOrderBulanan({ historiData }) {
  // 1. Logika 'useMemo' ini SUDAH BENAR (Menghasilkan 1 dan 2)
  const { satuan, bundle } = useMemo(() => {
    const { currentYear, currentMonth } = getDynamicMonths(historiData);
    let jenisBulanIni = { "Bangunan Rumah": 0, "Bundle Model": 0 };

    historiData.forEach((item) => {
      const tgl = new Date(item.tgl);
      if (
        item.status === "Berhasil" &&
        tgl.getFullYear() === currentYear &&
        tgl.getMonth() === currentMonth
      ) {
        if (item.order === "Bangunan Rumah") {
          jenisBulanIni["Bangunan Rumah"] += 1;
        } else if (item.order === "Bundle Model") {
          jenisBulanIni["Bundle Model"] += 1;
        }
      }
    });

    return {
      satuan: jenisBulanIni["Bangunan Rumah"],
      bundle: jenisBulanIni["Bundle Model"],
    };
  }, [historiData]);

  // 2. Data Chart (Ini juga sudah benar, mengirim [1, 2])
  const chartData = {
    labels: ["Satuan", "Bundle"],
    datasets: [
      {
        label: "Jumlah Order",
        data: [satuan, bundle], // Mengirim [1, 2]
        backgroundColor: ["#22c55e", "#a3e635"],
        borderColor: "#FFFFFF",
        borderWidth: 2,
      },
    ],
  };

  // 3. --- INI SOLUSINYA: Perbaiki Opsi Tooltip ---
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "80%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        // Kita tambahkan 'callbacks' untuk "memaksa" formatnya
        callbacks: {
          // 'label' akan dipanggil untuk setiap item di tooltip
          label: function (context) {
            const label = context.label || ""; // Misal: "Satuan"
            const value = context.raw || 0; // Misal: 1
            return `${label}: ${value}`; // Hasil: "Satuan: 1"
          },
          // 'title' (judul tooltip) kita hapus saja
          title: function () {
            return null; // Menghilangkan judul "Jumlah Order"
          },
        },
      },
    },
  };

  const total = satuan + bundle;

  // 4. Render JSX (Tidak berubah)
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-80 flex flex-col">
      <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
        Jenis Order (Bulan Terbaru)
      </h3>

      {total === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <p>Belum ada data untuk bulan ini.</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between">
          <div className="relative w-48 h-48 mx-auto mt-2 mb-2">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          <div className="flex justify-around">
            <LegendItem color="bg-green-600" label="Satuan" />
            <LegendItem color="bg-lime-500" label="Bundle" />
          </div>
        </div>
      )}
    </div>
  );
}
