import React, { useMemo } from "react";
import StatistikCard from "../StatistikCard";
import { Package } from "lucide-react";
import { getDynamicMonths, calculatePercentage } from "../utils/statistikUtils";

export default function PesananBulanan({ historiData }) {
  const { bulanIniPesanan, bulanLaluPesanan } = useMemo(() => {
    // 1. Dapatkan bulan dinamis berdasarkan data
    const { currentYear, currentMonth, lastMonthYear, lastMonth } =
      getDynamicMonths(historiData);

    let bulanIniPesanan = 0;
    let bulanLaluPesanan = 0;

    // 2. Loop data untuk menghitung
    historiData.forEach((item) => {
      const tgl = new Date(item.tgl);
      const itemMonth = tgl.getMonth();
      const itemYear = tgl.getFullYear();

      if (item.status === "Berhasil") {
        // Hitung bulan ini
        if (itemYear === currentYear && itemMonth === currentMonth) {
          bulanIniPesanan += 1;
        }
        // Hitung bulan lalu
        if (itemYear === lastMonthYear && itemMonth === lastMonth) {
          bulanLaluPesanan += 1;
        }
      }
    });

    return { bulanIniPesanan, bulanLaluPesanan };
  }, [historiData]); // Hanya hitung ulang jika historiData berubah

  const percentage = calculatePercentage(bulanIniPesanan, bulanLaluPesanan);

  return (
    <StatistikCard
      title="Pesanan Bulan Ini"
      value={`${bulanIniPesanan} Pesanan`}
      percentage={percentage}
      isPositive={bulanIniPesanan >= bulanLaluPesanan}
      icon={Package}
    />
  );
}
