// import React from 'react'

// export const Navbar = ({ activeTab }) => {
//   return (
//     <div className="bg-white shadow p-4 flex justify-between items-center">
//       <h1 className="text-xl font-semibold text-gray-800">
//         Current Tab: {activeTab}
//       </h1>

//       <div className="flex items-center gap-2">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="border border-gray-300 rounded px-2 py-1 text-sm"
//         />
//       </div>
//     </div>
//   )
// }



import React from 'react'
import { Menu } from 'lucide-react' // or use any other icon

export const Navbar = ({ activeTab, toggleSidebar }) => {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      {/* Left side: hamburger + title */}
      <div className="flex items-center gap-2">
        {/* Hamburger icon - only visible on small screens */}
        <button
          onClick={toggleSidebar}
          className="md:hidden focus:outline-none"
        >
          <Menu className="w-6 h-6 text-gray-800" />
        </button>

        <h1 className="text-xl font-semibold text-gray-800">
           {activeTab}
        </h1>
      </div>

      {/* Right side: search bar */}
      <div className="hidde md:flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        />
      </div>
    </div>
  )
}
