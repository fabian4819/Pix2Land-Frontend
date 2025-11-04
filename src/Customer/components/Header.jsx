import React from "react";
import { User, Bell } from "lucide-react";

/**
 * Header sederhana untuk sisi Customer.
 * BEDA dengan Header Admin.
 */
export default function Header() {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-end items-center z-10">
      <div className="flex items-center space-x-6 mr-4">
        <button className="text-gray-600 hover:text-gray-800 relative">
          <Bell size={20} />
          {/* Contoh Notifikasi */}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="flex items-center text-gray-600 hover:text-gray-800">
          <User size={20} className="mr-2" />
          <span className="font-medium">User Name</span>
        </button>
      </div>
    </header>
  );
}
