import { NavLink } from "react-router-dom";
// Anda perlu install react-icons: npm install react-icons
import { RxDashboard, RxBarChart } from "react-icons/rx";

export default function Sidebar() {
  const linkClasses =
    "flex items-center gap-3 p-3 rounded-lg transition-colors";
  const inactiveClasses = "hover:bg-green-700";
  const activeClasses = "bg-[#28A745] font-semibold shadow-md";

  return (
    <aside className="w-60 bg-[#1E8449] text-white flex flex-col min-h-screen shrink-0">
      <div className="p-6 text-2xl font-bold border-b border-green-700">
        Admin
      </div>

      <nav className="flex-1 p-4">
        <h3 className="text-xs uppercase text-green-300 font-bold mb-2">
          Menu
        </h3>
        <ul>
          <li>
            <NavLink
              to="/Admin/pages/Pelaporan"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeClasses : inactiveClasses}`
              }
              end
            >
              <RxDashboard size={20} />
              Pelaporan
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Admin/pages/Statistik"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeClasses : inactiveClasses}`
              }
            >
              <RxBarChart size={20} />
              Statistik
            </NavLink>
          </li>
        </ul>
      </nav>

      <footer className="p-6 text-sm text-green-300">
        Powered By Kedaireka
      </footer>
    </aside>
  );
}
