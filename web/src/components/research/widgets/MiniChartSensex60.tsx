import React, { memo } from 'react'
import MiniChart from '../components/MiniChart'

const MiniChatSensex60 = () => {
  return (
    <MiniChart symbol="BSE:SNSX60" />
    // <div className="h-48 min-w-56">
    // </div>
  )
}

export default memo(MiniChatSensex60)
