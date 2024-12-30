'use client'

import React from 'react'
import { useDrawer } from '@/app/modules/contexts/DrawerContext'

const Drawer = () => {
  const { isOpen, closeDrawer } = useDrawer()

  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-content">
        <button onClick={closeDrawer}>Close</button>
        {/* Drawer content goes here */}
      </div>
      <style jsx>{`
        .drawer {
          position: fixed;
          top: 0;
          right: -300px;
          width: 300px;
          height: 100%;
          background-color: white;
          box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
          transition: right 0.3s ease-in-out;
        }
        .drawer.open {
          right: 0;
        }
        .drawer-content {
          padding: 20px;
        }
      `}</style>
    </div>
  )
}

export default Drawer
