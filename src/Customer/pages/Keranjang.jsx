import React from "react";
import { X } from "lucide-react";

/**
 * Halaman Keranjang Belanja untuk Customer.
 */
export default function Keranjang() {
  // Contoh data
  const items = [
    { id: 1, name: "Bangunan Rumah Tipe 45", price: 300000 },
    { id: 2, name: "Bundle Model Taman", price: 150000 },
  ];
  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Keranjang Belanja
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Item di Keranjang Anda ({items.length})
        </h2>

        {/* Daftar Item */}
        <div className="mt-4 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border rounded-lg hover:shadow-sm"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
              </div>
              <button className="text-red-500 hover:text-red-700">
                <X size={18} />
              </button>
            </div>
          ))}

          {items.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              Keranjang Anda kosong.
            </p>
          )}

          {/* Total */}
          {items.length > 0 && (
            <div className="text-right mt-6 pt-4 border-t">
              <p className="text-lg text-gray-700">
                Total:
                <span className="font-bold text-xl text-gray-900 ml-2">
                  Rp {total.toLocaleString("id-ID")}
                </span>
              </p>
              <button className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition-colors font-semibold">
                Lanjut ke Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
