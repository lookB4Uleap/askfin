import React, { memo } from 'react'
import MiniChart from '../components/MiniChart'

const MiniChatSensex = () => {
  return (
    <MiniChart symbol="BSE:SENSEX" />
    // <div className="h-48 min-w-56">
    // </div>
  )
}

export default memo(MiniChatSensex)
