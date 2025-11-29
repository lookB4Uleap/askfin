import React from 'react'
import MiniChatSensex from '../widgets/MiniChatSensex'
import MiniChartSensex60 from '../widgets/MiniChartSensex60'
import MiniChatBSEBank from '../widgets/MiniChatBSEBank'

const MiniCharts = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="no-scrollbar flex gap-5 overflow-x-scroll">
        <MiniChatSensex />
        <MiniChartSensex60 />
        <MiniChatBSEBank />
      </div>
    </div>
  )
}

export default MiniCharts
