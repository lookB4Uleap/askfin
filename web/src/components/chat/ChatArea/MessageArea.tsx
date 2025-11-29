'use client'

import { useStore } from '@/store'
import Messages from './Messages'
import ScrollToBottom from '@/components/chat/ChatArea/ScrollToBottom'
import { StickToBottom } from 'use-stick-to-bottom'
import Widget from '@/components/research/asset/Widget'

// TODO: Disable the center styling

const MessageArea = () => {
  const { messages } = useStore()

  return (
    <StickToBottom
      className="relative mb-4 flex max-h-[calc(100vh-64px)] min-h-0 flex-grow flex-col"
      resize="smooth"
      initial="smooth"
    >
      <StickToBottom.Content className="flex min-h-full flex-col justify-center">
        {/* {symbol !== '' && type === 'chart' && <Chart symbol="BSE:SENSEX" />} */}
        <Widget />
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 px-4 text-center">
            <h1 className="text-2xl font-bold">
              Hi, ask anything in finance, analyze financial documents <br /> and do market research
            </h1>
            <p className="text-xl text-gray-400">Ready when you are</p>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-2xl space-y-9 px-4 pb-4">
            <Messages messages={messages} />
          </div>
        )}
      </StickToBottom.Content>
      <ScrollToBottom />
    </StickToBottom>
  )
}

export default MessageArea
