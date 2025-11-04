import React from "react";
import { Zap } from "lucide-react";

/**
 * Halaman Beranda untuk Customer.
 */
export default function Beranda() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Selamat Datang, User!
      </h1>

      {/* Contoh Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Produk Unggulan
          </h2>
          <p className="text-gray-600">
            Ini adalah halaman Beranda. Anda bisa menampilkan produk-produk
            unggulan atau penawaran spesial di sini.
          </p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-lg shadow-md flex items-center">
          <Zap size={32} className="mr-4" />
          <div>
            <h2 className="text-xl font-semibold mb-1">Promo Spesial!</h2>
            <p className="text-green-100">
              Dapatkan diskon 30% untuk Bundle Model terbaru.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
