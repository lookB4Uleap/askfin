'use client'
import Sidebar from '@/components/chat/Sidebar/Sidebar'
import { ChatArea } from '@/components/chat/ChatArea'
import { Suspense, useEffect } from 'react'
import useChatActions from '@/hooks/useChatActions'

export default function Home() {
  // Check if OS_SECURITY_KEY is defined on server-side
  const hasEnvToken = !!process.env.NEXT_PUBLIC_OS_SECURITY_KEY
  const envToken = process.env.NEXT_PUBLIC_OS_SECURITY_KEY || ''
  const { initialize } = useChatActions()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-background/80 flex h-screen">
        <Sidebar hasEnvToken={hasEnvToken} envToken={envToken} />
        <ChatArea />
      </div>
    </Suspense>
  )
}
