
import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../components/Sidebar';

const DashLayout = () => {
  return (
    <div>
      <Sidebar/>
      
        <div className='ml-60 flex flex-col gap-y-4'>
            <Outlet/>
        </div>
    </div>

  )
}

export default DashLayout;