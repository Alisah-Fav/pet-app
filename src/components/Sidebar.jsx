import React from 'react'
import K from "../constants"
import { Link, NavLink } from 'react-router'
import { Plus } from 'lucide-react'

const Sidebar = ({ setActiveTab, isOpen, onClose }) => {
  // Ensure onClose function is defined before calling
  const handleNavLinkClick = (link) => {
    setActiveTab(link.name);
    if (onClose) {
      onClose(); // 👈 Close sidebar on mobile nav
    }
  };
  return (
    <div
      className={`
        fixed top-0 left-0 h-full w-60 bg-blue-600 text-white z-40 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:h-screen
      `}
    >
      <div className="py-4 px-4 flex flex-col gap-y-6">
        <span className="text-lg font-bold">CENTSIBLE</span>

        <div className="flex flex-col gap-y-6">
          {K.NAVLINKS.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              onClick={() => {
                setActiveTab(link.name);
                onClose?.(); // 👈 Close sidebar on mobile nav
              }}
              end={link.path === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-blue-500 ${
                  isActive ? 'bg-white text-blue-600 font-semibold' : 'text-white'
                }`
              }
            >
              {link.icon && <link.icon className="w-5 h-5" />}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Add button */}
      <Link
        to="/dashboard/add-transaction"
        className="absolute bottom-6 right-4 bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition"
      >
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  );
};


export default Sidebar
