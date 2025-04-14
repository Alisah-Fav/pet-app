import React, { useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../components/Sidebar'
import { Navbar } from '../components/Navbar'

const DashLayout = () => {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)
  // const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        setActiveTab={setActiveTab}
        onClose={() => setIsSidebarOpen(false)} // Close the sidebar when a link is clicked
      />

      {/* Main content */}
      <div className="flex-1 bg-gray-50">
      <Navbar activeTab={activeTab} toggleSidebar={toggleSidebar} />

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashLayout
