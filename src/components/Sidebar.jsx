import React from 'react'
import K from "../constants"
import { Link, NavLink } from 'react-router'
import { Plus } from 'lucide-react'

const Sidebar = () => {
  return (
    <div className='flex flex-col w-60 bg-blue-600 h-screen py-4 px-4 gap-y-6 fixed left-0 top-0'>
      <span>CENTSIBLE</span>
      <div className='flex flex-col gap-y-6'>
        {K.NAVLINKS.map((link, index) => {
          return(
            <NavLink
            key={index}
            to={link.path}
            className="text-black"
            >
              {link.icon && <link.icon />}
              <span>{link.name}</span>
              </NavLink>
          );
        }) }
      </div>

      {/* Plus icon at the bottom */}
      <Link
        to="/dashboard/add-transaction"
        className=" absolute bottom-6 right-4 bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition  "
      >
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  )
}

export default Sidebar