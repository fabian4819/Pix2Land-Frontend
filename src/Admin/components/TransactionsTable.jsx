// src/components/TransactionsTable.jsx

import React from "react";
// 1. Impor dari TanStack Table dan ikon-ikon BARU
import { flexRender } from "@tanstack/react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

import TablePagination from "./TablePagination.jsx"; // <-- Impor komponen paginasi

// 2. Daftar Tab (Sesuaikan dengan key di placeholderData 'Pelaporan.jsx')
const tabs = ["Histori", "Berhasil", "Belum", "Batal", "Gagal"];

export default function TransactionsTable({
  activeTab,
  setActiveTab,
  table, // <-- 3. Terima 'table', BUKAN props lama
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {/* Bagian Tab */}
      <div className="flex border-b mb-4 flex-wrap overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-sm md:text-base whitespace-nowrap ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* 5. Render Tabel */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            {/* 6. Render Header dari 'table' */}
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="text-left text-sm text-gray-600 uppercase border-b"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-3 px-2 cursor-pointer select-none hover:bg-gray-50"
                    // 7. Handler sorting BARU
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {/* Render nama header */}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {/* 8. Ikon sorting BARU */}
                      {{
                        asc: (
                          <FaSortUp
                            className="inline ml-1 text-gray-500"
                            size={12}
                          />
                        ),
                        desc: (
                          <FaSortDown
                            className="inline ml-1 text-gray-500"
                            size={12}
                          />
                        ),
                      }[header.column.getIsSorted()] ??
                        (header.column.getCanSort() ? (
                          <FaSort
                            className="inline ml-1 text-gray-300"
                            size={12}
                          />
                        ) : null)}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {/* 9. Render Body dari 'table' */}
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-4 px-2 text-gray-700">
                    {/* 10. 'flexRender' akan otomatis merender 
                        teks biasa atau komponen StatusBadge */}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination table={table} />{" "}
      {/* <-- 11. Gunakan komponen paginasi */}
    </div>
  );
}
