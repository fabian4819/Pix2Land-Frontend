import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Impor HANYA Layout (Bungkusnya)
import AdminLayout from "./Admin/AdminLayout";
import CustomerLayout from "./Customer/CustomerLayout";

/**
 * App.jsx sekarang HANYA bertugas mengarahkan ke
 * "Gedung" Admin atau "Gedung" Customer.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* path="/admin/*" berarti: 
          "Jika URL diawali /admin, serahkan semua urusan ke AdminLayout"
          Tanda (*) sangat penting!
        */}
        <Route path="/Admin/*" element={<AdminLayout />} />

        {/* path="/*" berarti:
          "Untuk semua URL LAINNYA, serahkan ke CustomerLayout"
          (Ini akan menangani /, /riwayat, /keranjang, dll.)
        */}
        <Route path="/Customer/*" element={<CustomerLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
