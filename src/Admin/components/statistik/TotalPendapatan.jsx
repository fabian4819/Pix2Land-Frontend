import React, { useMemo } from "react";
import StatistikCard from "../StatistikCard";
import { Landmark } from "lucide-react";
import {
  getDynamicMonths,
  formatRupiah,
  calculatePercentage,
} from "../utils/statistikUtils";

export default function TotalPendapatan({ historiData }) {
  const { totalTahunIni, totalTahunLalu, tahunIni } = useMemo(() => {
    // Ambil tahun terbaru dari data
    const { currentYear } = getDynamicMonths(historiData);
    const tahunIni = currentYear;
    const tahunLalu = currentYear - 1;

    let totalTahunIni = 0;
    let totalTahunLalu = 0;

    historiData.forEach((item) => {
      const tgl = new Date(item.tgl);
      const itemYear = tgl.getFullYear();
      const jumlah = parseInt(item.jumlah) || 0;

      if (item.status === "Berhasil") {
        if (itemYear === tahunIni) {
          totalTahunIni += jumlah;
        }
        if (itemYear === tahunLalu) {
          totalTahunLalu += jumlah;
        }
      }
    });

    return { totalTahunIni, totalTahunLalu, tahunIni };
  }, [historiData]);

  const percentage = calculatePercentage(
    totalTahunIni,
    totalTahunLalu,
    "vs tahun lalu"
  );

  return (
    <StatistikCard
      title={`Total Pendapatan ${tahunIni}`}
      value={formatRupiah(totalTahunIni)}
      percentage={percentage}
      isPositive={totalTahunIni >= totalTahunLalu}
      icon={Landmark}
    />
  );
}
