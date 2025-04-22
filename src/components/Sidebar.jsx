import React from 'react'
import K from "../constants"
import { Link, NavLink } from 'react-router'
import { LogOut, Plus } from 'lucide-react'

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
        fixed top-0 left-0 h-full w-60 bg-teal-400 text-white z-40 transition-transform duration-300 ease-in-out
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
                `flex items-center gap-2 p-2 rounded hover:bg-teal-500 ${
                  isActive ? 'bg-white text-teal-400 font-semibold' : 'text-white'
                }`
              }
            >
              {link.icon && <link.icon className="w-5 h-5" />}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>

        <button className="mt-35 text-white px-3 py-2 w-full rounded-md flex items-center justify-center gap-x-2 ">
        <LogOut />
        <span>Logout</span>
      </button>
      </div>

    </div>
  );
};


export default Sidebar
