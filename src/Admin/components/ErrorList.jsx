import React from "react";

// Komponen kecil untuk setiap item
// (Data ini diambil dari desain asli Anda)
const ErrorItem = ({ label, percentage }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
    <div>
      <p className="font-semibold text-gray-800">{label}</p>
      <p className="text-xl font-bold text-gray-600">{percentage}%</p>
    </div>
    {/* Lingkaran statis "100" */}
    <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full border-4 border-gray-300">
      <span className="text-xl font-bold text-gray-700">100</span>
    </div>
  </div>
);

// Pastikan untuk "export default"
export default function ErrorList() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        PERSENTASE KESALAHAN DATA
      </h3>
      <div className="space-y-4">
        {/* Ini adalah data dari desain pertama Anda */}
        <ErrorItem label="Kotabaru" percentage={1} />
        <ErrorItem label="Terban" percentage={1} />
      </div>
    </div>
  );
}
