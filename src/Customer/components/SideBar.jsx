import React from "react";
import { NavLink } from "react-router-dom";
import { Home, History, ShoppingCart, LandPlot } from "lucide-react";

// Komponen helper untuk Navigasi
const NavItem = ({ to, icon, children }) => {
  const Icon = icon;
  return (
    <NavLink
      to={to}
      end // 'end' penting agar '/' tidak selalu aktif
      className={({ isActive }) =>
        `flex items-center p-3 my-1 rounded-lg transition-colors ${
          isActive
            ? "bg-green-600 text-white shadow-md"
            : "text-gray-700 hover:bg-gray-200"
        }`
      }
    >
      <Icon size={20} className="mr-3 flex-shrink-0" />
      <span className="font-medium">{children}</span>
    </NavLink>
  );
};

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg h-screen p-4 flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6 p-3 border-b">
        <LandPlot size={28} className="text-green-600" />
        <h1 className="text-2xl font-bold ml-2 text-gray-800">Pix2Land</h1>
      </div>

      {/* Navigasi */}
      <nav>
        <NavItem to="/" icon={Home}>
          Beranda
        </NavItem>
        <NavItem to="/riwayat" icon={History}>
          Riwayat Pembelian
        </NavItem>
        <NavItem to="/keranjang" icon={ShoppingCart}>
          Keranjang
        </NavItem>
      </nav>
    </div>
  );
}
