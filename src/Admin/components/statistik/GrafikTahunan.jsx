import React, { useMemo } from "react";
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
import {
  getDynamicMonths,
  NAMA_BULAN,
  formatRupiah,
} from "../utils/statistikUtils";

export default function GrafikTahunan({ historiData }) {
  const { data, tahunIni, tahunLalu } = useMemo(() => {
    const { currentYear } = getDynamicMonths(historiData);
    const tahunIni = currentYear;
    const tahunLalu = currentYear - 1;

    const bulanTemplate = NAMA_BULAN.map((nama) => ({
      name: nama,
      [tahunIni]: 0,
      [tahunLalu]: 0,
    }));

    historiData.forEach((item) => {
      const tgl = new Date(item.tgl);
      const itemMonth = tgl.getMonth();
      const itemYear = tgl.getFullYear();
      const jumlah = parseInt(item.jumlah) || 0;

      if (
        item.status === "Berhasil" &&
        (itemYear === tahunIni || itemYear === tahunLalu)
      ) {
        bulanTemplate[itemMonth][itemYear] += jumlah;
      }
    });

    return { data: bulanTemplate, tahunIni, tahunLalu };
  }, [historiData]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-96 flex flex-col mt-8">
      <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
        Pendapatan Tahunan
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
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
            tickFormatter={(val) => `${val / 1000000}Jt`} // Format ke Jutaan
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
          />
          <Tooltip
            formatter={(value) => formatRupiah(value)}
            wrapperClassName="rounded-lg shadow-lg"
            contentStyle={{ border: "none", borderRadius: "8px" }}
          />
          <Legend verticalAlign="top" align="right" />
          <Line
            type="monotone"
            dataKey={tahunIni}
            name={`Tahun Ini (${tahunIni})`} // Dinamis
            stroke="#a78bfa"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey={tahunLalu}
            name={`Tahun Lalu (${tahunLalu})`} // Dinamis
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
