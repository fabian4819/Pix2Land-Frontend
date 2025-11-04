import React from "react";

/**
 * Halaman Riwayat Pembelian untuk Customer.
 */
export default function RiwayatPembelian() {
  // Contoh data (nantinya ini akan di-fetch dari API)
  const histori = [
    {
      id: "#P2L-001",
      tgl: "1 Nov 2025",
      item: "Bundle Model A",
      total: 500000,
      status: "Berhasil",
    },
    {
      id: "#P2L-002",
      tgl: "30 Okt 2025",
      item: "Bangunan Rumah Tipe 45",
      total: 300000,
      status: "Berhasil",
    },
    {
      id: "#P2L-003",
      tgl: "29 Okt 2025",
      item: "Bundle Model C",
      total: 700000,
      status: "Gagal",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Berhasil":
        return "bg-green-100 text-green-800";
      case "Gagal":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Riwayat Pembelian
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Daftar Transaksi Anda
        </h2>

        {/* Tabel Riwayat */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Pesanan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {histori.map((trx) => (
                <tr key={trx.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {trx.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {trx.tgl}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {trx.item}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    Rp {trx.total.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                        trx.status
                      )}`}
                    >
                      {trx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
