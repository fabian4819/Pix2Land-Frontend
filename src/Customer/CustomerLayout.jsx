import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header"; // Header BARU untuk Customer
import Sidebar from "./components/Sidebar"; // Sidebar BARU untuk Customer

/**
 * Ini adalah komponen "pembungkus" untuk semua halaman Customer.
 * Rute / akan me-render ini.
 */
export default function CustomerLayout() {
  return (
    <div className="flex h-screen bg-gray-100 font-inter">
      {/* Sidebar Navigasi Customer */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Customer (bisa untuk profil pengguna, dll) */}
        <Header />

        {/* Konten Halaman Utama */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {/* Di sinilah Beranda, Riwayat, Keranjang akan di-render */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
