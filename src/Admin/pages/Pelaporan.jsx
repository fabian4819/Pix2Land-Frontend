// src/pages/Pelaporan.jsx

// 1. Impor React dan Hooks
import React, { useState, useMemo, useEffect } from "react";

// 2. Impor TanStack Table
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  createColumnHelper,
} from "@tanstack/react-table";

// 3. Impor Komponen Anda
//import Header from "../components/Header.jsx";
import StatCard from "../components/StatCard.jsx";
import DataTabel from "../components/TransactionsTable.jsx"; // Nama file disesuaikan
import ProcessChart from "../components/ProcessChart.jsx";
import OrderChart from "../components/OrderChart.jsx";
import StatusBadge from "../components/StatusBadge.jsx"; // <-- TAMBAHAN: Impor StatusBadge

// Impor Ikon
import { FaCheck, FaSearch, FaTimes, FaBan } from "react-icons/fa";

// 4. Definisi Kolom (DI LUAR KOMPONEN)
// Ini memberi tahu TanStack Table cara menampilkan data
const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("kode", { header: "Kode Transaksi" }),
  columnHelper.accessor("tgl", { header: "Tanggal", sortingFn: "datetime" }),
  columnHelper.accessor("order", { header: "Jenis Order" }),
  columnHelper.accessor("status", {
    header: "Status",
    // Gunakan komponen StatusBadge untuk merender sel ini
    cell: (info) => <StatusBadge status={info.getValue()} />,
    enableSorting: false, // Tidak perlu sorting di kolom status
  }),
];

// ==========================================================
// KOMPONEN UTAMA
// ==========================================================
export default function Pelaporan() {
  // 5. State untuk UI dan TanStack Table
  const [activeTab, setActiveTab] = useState("Histori");
  const [sorting, setSorting] = useState([]); // <-- State untuk sorting TanStack

  // 6. State untuk Data Fetching
  const [masterData, setMasterData] = useState([]); // Awalnya array kosong
  const [isLoading, setIsLoading] = useState(true); // State untuk loading

  // HAPUS: const [sortConfig, setSortConfig] = useState(...) // Tidak perlu lagi
  // Pagination
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // 7. useEffect untuk mengambil data dari API (json-server)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Ambil data dari API yang sudah kita buat
        const response = await fetch("http://localhost:3001/historiData");
        const dataFromApi = await response.json();
        setMasterData(dataFromApi); // Simpan data mentah ke state
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setIsLoading(false); // Selesai loading
      }
    };

    fetchData(); // Panggil fungsi fetch
  }, []); // [] = Hanya berjalan 1x saat komponen dimuat

  // 8. 'useMemo' untuk memproses 'masterData' SETELAH di-fetch
  // Ini akan dihitung ulang HANYA jika 'masterData' berubah
  const placeholderData = useMemo(() => {
    const berhasilData = masterData.filter(
      (item) => item.status === "Berhasil"
    );
    const belumData = masterData.filter((item) => item.status === "Belum");
    const dibatalkanData = masterData.filter((item) => item.status === "Batal"); // Sesuaikan dengan data Anda ('Batal' atau 'Ditolak')
    const gagalData = masterData.filter((item) => item.status === "Gagal");

    return {
      Gagal: gagalData,
      Batal: dibatalkanData,
      Belum: belumData,
      Berhasil: berhasilData, // 'Disetujui' adalah alias untuk 'Berhasil'
      Histori: masterData,
    };
  }, [masterData]); // <-- Penting: Bergantung pada masterData

  // 9. Data 'stats' (Sekarang reaktif berdasarkan data API)
  const stats = [
    {
      icon: <FaCheck />,
      count: placeholderData.Berhasil.length,
      title: "Berhasil",
      bgColor: "bg-blue-500",
    },
    {
      icon: <FaSearch />,
      count: placeholderData.Belum.length,
      title: "Belum",
      bgColor: "bg-yellow-500",
    },
    {
      icon: <FaTimes />,
      count: placeholderData.Batal.length,
      title: "Batal",
      bgColor: "bg-red-500",
    },
    {
      icon: <FaBan />,
      count: placeholderData.Gagal.length,
      title: "Gagal",
      bgColor: "bg-gray-800",
    },
  ];

  // 10. 'useMemo' untuk memilih data berdasarkan Tab Aktif
  const data = useMemo(() => {
    return placeholderData[activeTab] || [];
  }, [activeTab, placeholderData]); // Bergantung pada tab & data

  const orderChartData = useMemo(() => {
    const satuanCount = masterData.filter(
      (item) => item.order === "Bangunan Rumah"
    ).length;
    const bundleCount = masterData.filter(
      (item) => item.order === "Bundle Model"
    ).length;

    return { satuan: satuanCount, bundle: bundleCount };
  }, [masterData]);
  // 11. Inisialisasi Hook TanStack Table
  const table = useReactTable({
    data, // Data yang sudah difilter berdasarkan tab
    columns, // Definisi kolom dari langkah #4
    state: {
      sorting, // Gunakan state sorting kita
      pagination, // State pagination
    },
    onSortingChange: setSorting, // Update state saat sorting berubah
    onPaginationChange: setPagination, // Update state saat pagination berubah
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // 12. Tampilkan Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl">Memuat data...</p>
      </div>
    );
  }

  const chartCounts = {
    Berhasil: placeholderData.Berhasil.length,
    Belum: placeholderData.Belum.length,
    Batal: placeholderData.Batal.length,
    Gagal: placeholderData.Gagal.length,
  };
  // 13. Render Halaman
  return (
    <main className="p-8">
      {/* Bagian Statistik (tidak berubah) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            icon={stat.icon}
            count={stat.count}
            title={stat.title}
            bgColor={stat.bgColor}
          />
        ))}
      </div>

      {/* Bagian Konten Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* 14. Kirim PROPS BARU ke DataTabel */}
          <DataTabel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            table={table} // <-- KIRIM 'table' BUKAN props lama
            // HAPUS: currentData={currentData}
            // HAPUS: onSort={handleSort}
            // HAPUS: sortConfig={sortConfig}
          />
        </div>

        <div className="flex flex-col space-y-8">
          <ProcessChart data={chartCounts} />
          <OrderChart data={orderChartData} />
        </div>
      </div>
    </main>
  );
}
