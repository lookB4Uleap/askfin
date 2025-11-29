'use client'

import ChatInput from './ChatInput'
import MessageArea from './MessageArea'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { useRouter } from 'next/navigation'

const ChatArea = () => {
  const router = useRouter()

  return (
    <main className="bg-background relative m-1.5 flex flex-grow flex-col rounded-xl">
      <div className="absolute right-4 top-4 z-10 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => {
            router.push('/onboarding')
          }}
        >
          <Icon type="reasoning" size="sm" />
          Generate Financial Plan
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => {
            const fileInput = document.querySelector(
              'input[type="file"]'
            ) as HTMLInputElement
            fileInput?.click()
          }}
        >
          <Icon type="paperclip" size="sm" />
          Analyze financial Docs
        </Button>
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
