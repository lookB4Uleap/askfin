'use client'

import ChatInput from './ChatInput'
import MessageArea from './MessageArea'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

const ChatArea = () => {
  return (
    <main className="relative m-1.5 flex flex-grow flex-col rounded-xl bg-background">
      <div className="absolute right-4 top-4 z-10">
        <Link href="/research">
          <Button variant="outline" size="sm" className="gap-2">
            <Icon type="telescope" size="sm" />
            Market research
          </Button>
        </Link>
      </div>
      <MessageArea />
      <div className="sticky bottom-0 ml-9 px-4 pb-2">
        <ChatInput />
      </div>
    </main>
  )
}

export default ChatArea
