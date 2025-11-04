import React, { useState, useEffect } from "react";
//import Header from "../components/Header";
import { Download } from "lucide-react";

import PesananBulanan from "../components/statistik/PesananBulanan";
import PendapatanBulanan from "../components/statistik/PendapatanBulanan";
import TotalPendapatan from "../components/statistik/TotalPendapatan";
import JenisOrderBulanan from "../components/statistik/JenisOrderBulanan";
import Pesanan6Bulanan from "../components/statistik/Pesanan6Bulanan";
import GrafikTahunan from "../components/statistik/GrafikTahunan";

export default function Statistik() {
  const [historiData, setHistoriData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. HANYA FOKUS MENGAMBIL DATA
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Ganti URL jika diperlukan
        const response = await fetch("http://localhost:3001/historiData");
        const historiApi = await response.json();
        setHistoriData(historiApi);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // 3. TAMPILKAN LOADING (Sama seperti sebelumnya)
  if (isLoading) {
    return (
      <main className="p-8 bg-gray-50 min-h-screen">
        <p className="text-lg text-gray-600">Memuat data statistik...</p>
      </main>
    );
  }

  // 4. RENDER HALAMAN DENGAN KOMPONEN BARU
  //    Tidak ada lagi 'useMemo' raksasa.
  //    Kita hanya perlu membagikan `historiData` ke setiap komponen.
  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      {/* Tombol Ekspor PDF (Sama seperti sebelumnya) */}
      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors">
          <Download size={18} />
          Expor PDF
        </button>
      </div>

      {/* Baris 1: Kartu Statistik (Menggunakan komponen baru) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <PesananBulanan historiData={historiData} />
        <PendapatanBulanan historiData={historiData} />
        <TotalPendapatan historiData={historiData} />
      </div>

      {/* Baris 2: Chart Kecil (Menggunakan komponen baru) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <JenisOrderBulanan historiData={historiData} />
        </div>
        <div className="lg:col-span-2">
          <Pesanan6Bulanan historiData={historiData} />
        </div>
      </div>

      {/* Baris 3: Chart Besar (Menggunakan komponen baru) */}
      {/* 'GrafikTahunan.jsx' menggantikan 'PendapatanChart' yang lama */}
      <GrafikTahunan historiData={historiData} />
    </main>
  );
}
