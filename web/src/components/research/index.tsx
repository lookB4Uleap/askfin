'use client'

import React from 'react'
import MiniCharts from './components/MiniCharts'
import StockMarketOverview from './widgets/StockMarketOverview'
import Headlines from './components/Headlines'
import Sidebar from '../chat/Sidebar'
import { Search } from './components/Search'

const Research = () => {
  const hasEnvToken = !!process.env.NEXT_PUBLIC_OS_SECURITY_KEY
  const envToken = process.env.NEXT_PUBLIC_OS_SECURITY_KEY || ''

  return (
    <div className="flex w-screen flex-1">
      <Sidebar hasEnvToken={hasEnvToken} envToken={envToken} />
      <div className="flex flex-1 flex-col">
        <div className="flex w-full items-center justify-center px-5 py-2">
          <Search />
        </div>
        <div className="flex w-full items-center justify-center p-5">
          <MiniCharts />
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center">
          <div className="flex flex-1">
            <Headlines />
          </div>
          <div className="flex h-full">
            <StockMarketOverview />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Research
