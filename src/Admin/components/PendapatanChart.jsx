import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Formatter untuk Y-Axis (menampilkan angka biasa)
const formatYAxis = (tickItem) => {
  return String(tickItem);
};

// HAPUS: const data = [...] (Data dummy sudah dihapus)

// UBAH: Terima 'data' sebagai prop
export default function PendapatanChart({ data }) {
  // Jika data belum siap, tampilkan pesan loading
  if (!data) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg h-96 flex justify-center items-center mt-8">
        <p>Memuat data chart...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-96 flex flex-col mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data} // GUNAKAN: data dari prop
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            dy={10}
            tick={{ fontSize: 12, fill: "#6B7280" }}
          />
          <YAxis
            tickFormatter={formatYAxis} // UBAH: Formatter simpel
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
          />
          <Tooltip
            // UBAH: Tampilkan sebagai "Pesanan"
            formatter={(value) => `${value} Pesanan`}
            wrapperClassName="rounded-lg shadow-lg"
            contentStyle={{ border: "none", borderRadius: "8px" }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ top: -10 }}
          />
          <Line
            type="monotone"
            dataKey="2025"
            stroke="#a78bfa"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="2024"
            stroke="#f87171"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
