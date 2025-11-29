import React, { memo } from 'react'
import MiniChart from '../components/MiniChart'

const MiniChatBSEBank = () => {
  return (
    <MiniChart symbol="BSE:BANK" />
    // <div className="h-48 min-w-56">
    // </div>
  )
}

export default memo(MiniChatBSEBank)
