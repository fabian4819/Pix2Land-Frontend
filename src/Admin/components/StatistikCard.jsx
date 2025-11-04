// Ikon untuk panah (opsional, tapi bagus)
import React from "react";
//import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Icon } from "lucide-react";

export default function StatistikCard({
  title,
  value,
  percentage,
  icon: IconComponent,
  isPositive,
}) {
  const percentageColor = isPositive ? "text-green-600" : "text-red-600";
  const PercentageIcon = isPositive ? ArrowUpRight : ArrowDownRight;
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg relative overflow-hidden">
      {IconComponent && (
        <IconComponent
          size={100}
          className="absolute top-4 right-4 text-gray-100 opacity-70"
        />
      )}
      {/* Konten Teks (diberi z-index agar di atas ikon) */}
      <div className="relative z-10">
        <h3 className="text-sm font-semibold text-gray-500 uppercase">
          {title}
        </h3>
        <p className="text-3xl font-bold text-gray-800 my-2">{value}</p>
        <div className={`flex items-center text-sm ${percentageColor}`}>
          <PercentageIcon size={16} className="mr-1" />
          <span>{percentage}</span>
        </div>
      </div>
    </div>
  );
}
