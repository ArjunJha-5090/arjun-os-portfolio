import React from 'react'
import VirtualOS from './components/VirtualOS'

function App() {
  console.log("Rendering HeffernanOS V3 (Pure 2D Stable)...")

  return (
    <div className="fallback-container">
      <VirtualOS />

      {/* Dynamic Background */}
      <div className="glow-bg"></div>
    </div>
  )
}

export default App
