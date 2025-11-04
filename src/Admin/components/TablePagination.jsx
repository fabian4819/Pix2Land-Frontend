// src/components/TablePagination.jsx

import React from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

// Komponen ini HANYA menerima prop 'table'
export default function TablePagination({ table }) {
  // Opsi ukuran halaman, termasuk "Semua"
  // Dihitung di sini agar selalu update
  const pageSizeOptions = [10, 25, 50, 100];
  const totalRows = table.getCoreRowModel().rows.length;

  if (totalRows > 100 && !pageSizeOptions.includes(totalRows)) {
    // Tambahkan opsi "Semua" hanya jika berbeda
    pageSizeOptions.push(totalRows);
  } else if (!pageSizeOptions.includes(totalRows)) {
    // Pastikan total baris ada jika kurang dari 100
    pageSizeOptions.push(totalRows);
    pageSizeOptions.sort((a, b) => a - b); // Jaga urutan
  }

  return (
    <div className="flex items-center justify-between gap-4 p-4 border-t border-gray-200 flex-wrap">
      {/* Pilihan Page Size */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Baris per halaman:</span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {pageSizeOptions.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {/* Tampilkan "Semua" untuk nilai total baris */}
              {pageSize === totalRows ? `Semua (${pageSize})` : pageSize}
            </option>
          ))}
        </select>
      </div>

      {/* Info Halaman */}
      <span className="text-sm text-gray-700">
        Halaman{" "}
        <strong>
          {table.getState().pagination.pageIndex + 1} dari{" "}
          {table.getPageCount()}
        </strong>
      </span>

      {/* Tombol Navigasi */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaAngleDoubleLeft />
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaAngleRight />
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaAngleDoubleRight />
        </button>
      </div>
    </div>
  );
}
