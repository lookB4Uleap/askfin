import React, { memo } from 'react'
import MiniChart from '../components/MiniChart'

const MiniChatNifty = () => {
  return (
    <MiniChart symbol="NSE:NIFTY" />
    // <div className="h-48 min-w-56">
    // </div>
  )
}

export default memo(MiniChatNifty)
