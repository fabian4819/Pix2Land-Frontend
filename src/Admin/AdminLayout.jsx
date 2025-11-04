import React from "react";
import { Routes, Route } from "react-router-dom";

// 1. Panggil komponen Admin (Header DAN Sidebar)
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

// 2. Impor halaman-halaman Admin
import Statistik from "./pages/Statistik";
import Pelaporan from "./pages/Pelaporan";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100 font-inter">
      {/* 3. Panggil Sidebar kustom Anda */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 4. Panggil Header kustom Anda */}
        <Header />
        {/* 5. Konten Halaman (dengan Rute Bersarang) */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          {" "}
          {/* 'Routes' ini akan me-render halaman berdasarkan 
            link yang sudah kita perbaiki di Sidebar.
          */}{" "}
          <Routes>
            {/* /admin akan me-render Pelaporan */}
            <Route index element={<Pelaporan />} />
            {/* /admin/statistik akan me-render Statistik */}
            <Route path="statistik" element={<Statistik />} />{" "}
          </Routes>
        </main>
      </div>
    </div>
  );
}
