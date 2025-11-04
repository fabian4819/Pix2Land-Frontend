import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { NAMA_BULAN } from "../utils/statistikUtils";

export default function Pesanan6Bulanan({ historiData }) {
  const pesananData = useMemo(() => {
    const bulanPesanan = {};

    historiData.forEach((item) => {
      if (item.status === "Berhasil") {
        const tgl = new Date(item.tgl);
        const itemMonth = tgl.getMonth();
        const itemYear = tgl.getFullYear();

        const dateKey = `${itemYear}-${String(itemMonth).padStart(2, "0")}`;
        if (!bulanPesanan[dateKey]) {
          bulanPesanan[dateKey] = {
            name: `${NAMA_BULAN[itemMonth]} '${String(itemYear).slice(2)}`,
            Pesanan: 0,
          };
        }
        bulanPesanan[dateKey].Pesanan += 1;
      }
    });

    // Format data: Ambil 6 entri terakhir yang sudah diurutkan
    return Object.keys(bulanPesanan)
      .sort()
      .slice(-6)
      .map((key) => bulanPesanan[key]);
  }, [historiData]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-80 flex flex-col">
      <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
        Pesanan 6 Bulan Terakhir
      </h3>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="pesananGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={pesananData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} domain={["auto", "auto"]} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Pesanan"
              stroke="#22c55e"
              fill="url(#pesananGradient)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
