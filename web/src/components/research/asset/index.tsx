'use client'

import React, { Suspense } from 'react'

import Sidebar from '../../chat/Sidebar'

import withChat from '@/HOCs/withChat'
import { ChatArea } from '@/components/chat/ChatArea'

const Asset = () => {
  const hasEnvToken = !!process.env.NEXT_PUBLIC_OS_SECURITY_KEY
  const envToken = process.env.NEXT_PUBLIC_OS_SECURITY_KEY || ''

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-background/80 flex h-screen">
        <Sidebar hasEnvToken={hasEnvToken} envToken={envToken} />
        <ChatArea />
      </div>
    </Suspense>
  )
}

export default withChat(Asset)
