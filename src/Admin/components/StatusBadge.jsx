// src/components/StatusBadge.jsx

import React from "react";

// Ini adalah pemetaan antara 'status' dari data Anda
// dengan 'class' Tailwind CSS untuk warnanya.
const statusMap = {
  Berhasil: "bg-green-100 text-green-800",
  Belum: "bg-gray-100 text-gray-800",
  Batal: "bg-red-100 text-red-800",
  Ditinjau: "bg-yellow-100 text-yellow-800",
  // Tambahkan status lain jika ada di data Anda
};

export default function StatusBadge({ status }) {
  // Ambil class warna yang sesuai, atau gunakan 'default' (abu-abu)
  // jika statusnya tidak dikenal.
  const Sesuai = statusMap[status] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${Sesuai}`}
    >
      {status}
    </span>
  );
}
