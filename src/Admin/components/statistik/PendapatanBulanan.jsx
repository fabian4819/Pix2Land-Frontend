import React, { useMemo } from "react";
import StatistikCard from "../StatistikCard";
import { Wallet } from "lucide-react";
import {
  getDynamicMonths,
  formatRupiah,
  calculatePercentage,
} from "../utils/statistikUtils";

export default function PendapatanBulanan({ historiData }) {
  const { bulanIniPendapatan, bulanLaluPendapatan } = useMemo(() => {
    const { currentYear, currentMonth, lastMonthYear, lastMonth } =
      getDynamicMonths(historiData);

    let bulanIniPendapatan = 0;
    let bulanLaluPendapatan = 0;

    historiData.forEach((item) => {
      const tgl = new Date(item.tgl);
      const itemMonth = tgl.getMonth();
      const itemYear = tgl.getFullYear();
      const jumlah = parseInt(item.jumlah) || 0;

      if (item.status === "Berhasil") {
        // Hitung bulan ini
        if (itemYear === currentYear && itemMonth === currentMonth) {
          bulanIniPendapatan += jumlah;
        }
        // Hitung bulan lalu
        if (itemYear === lastMonthYear && itemMonth === lastMonth) {
          bulanLaluPendapatan += jumlah;
        }
      }
    });

    return { bulanIniPendapatan, bulanLaluPendapatan };
  }, [historiData]);

  const percentage = calculatePercentage(
    bulanIniPendapatan,
    bulanLaluPendapatan
  );

  return (
    <StatistikCard
      title="Pendapatan Bulan Ini"
      value={formatRupiah(bulanIniPendapatan)}
      percentage={percentage}
      isPositive={bulanIniPendapatan >= bulanLaluPendapatan}
      icon={Wallet}
    />
  );
}
