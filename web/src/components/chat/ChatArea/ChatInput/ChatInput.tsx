'use client'
import { useState, useRef } from 'react'
import { toast } from 'sonner'
import { TextArea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store'
import useAIChatStreamHandler from '@/hooks/useAIStreamHandler'
import { useQueryState } from 'nuqs'
import Icon from '@/components/ui/icon'
import { useWidgetContext } from '@/hooks/useWidgetContext'

const ChatInput = () => {
  const { chatInputRef } = useStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  // const initialQueryHandled = useRef<boolean>(false)

  const { handleStreamResponse } = useAIChatStreamHandler()
  const [selectedAgent] = useQueryState('agent')
  const [teamId] = useQueryState('team')
  const [query] = useQueryState('q', { defaultValue: '' })
  const [inputMessage, setInputMessage] = useState(query)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const isStreaming = useStore((state) => state.isStreaming)

  const widgetContext = useWidgetContext()

  // useEffect(() => {
  //   ;(async () => {
  //     if (!query || query === '' || initialQueryHandled.current || agent === '')
  //       return
  //     initialQueryHandled.current = true

  //     const userContext = JSON.parse(
  //       localStorage.getItem('onboarding_data') as string
  //     )

  //     userContext.name = ''

  //     const currentMessage = JSON.stringify({
  //       contex: `${widgetContext} ${JSON.stringify(userContext)}`,
  //       query
  //     })

  //     handleStreamResponse(currentMessage)
  //     setQuery(null)
  //   })()
  // }, [handleStreamResponse, query, widgetContext, setQuery, agent])

  const handleSubmit = async () => {
    if (!inputMessage.trim()) return

    const userContext = JSON.parse(
      localStorage.getItem('onboarding_data') as string
    )

    userContext.name = ''

    console.log('user context', userContext)
    console.log('widget context', widgetContext)

    // const currentMessage = inputMessage
    const currentMessage = JSON.stringify({
      contex: `${widgetContext} ${JSON.stringify(userContext)}`,
      query: inputMessage
    })
    setInputMessage('')
    setSelectedFile(null)

    console.log('inputMessage', currentMessage)
    const formData = new FormData()
    formData.append('message', currentMessage)
    if (selectedFile) {
      formData.append('files', selectedFile)
    }

    try {
      await handleStreamResponse(formData)
    } catch (error) {
      toast.error(
        `Error in handleSubmit: ${
          error instanceof Error ? error.message : String(error)
        }`
      )
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      toast.success(`Selected file: ${file.name}`)
    }
  }

  return (
    <div className="font-geist relative mx-auto mb-1 flex w-full max-w-2xl flex-col items-end justify-center gap-y-2">
      {selectedFile && (
        <div className="bg-primaryAccent flex w-full items-center justify-between rounded-lg border p-2 text-sm">
          <div className="flex items-center gap-2">
            <Icon type="paperclip" size="sm" />
            <span className="truncate">{selectedFile.name}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => {
              setSelectedFile(null)
              if (fileInputRef.current) {
                fileInputRef.current.value = ''
              }
            }}
          >
            <Icon type="x" size="sm" />
          </Button>
        </div>
      )}
      <div className="flex w-full items-end gap-x-2">
        <TextArea
          placeholder={'Ask anything'}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (
              e.key === 'Enter' &&
              !e.nativeEvent.isComposing &&
              !e.shiftKey &&
              !isStreaming
            ) {
              e.preventDefault()
              handleSubmit()
            }
          }}
          className="border-accent bg-primaryAccent text-primary focus:border-accent w-full border px-4 text-sm"
          disabled={!(selectedAgent || teamId)}
          ref={chatInputRef}
        />
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileSelect}
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={!(selectedAgent || teamId) || isStreaming}
          size="icon"
          className="bg-primary rounded-xl p-5 text-black"
        >
          <Icon type="paperclip" color="primaryAccent" />
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={
            !(selectedAgent || teamId) || !inputMessage.trim() || isStreaming
          }
          size="icon"
          className="bg-primary rounded-xl p-5 text-black"
        >
          <Icon type="send" color="primaryAccent" />
        </Button>
      </div>
    </div>
  )
}

export default ChatInput
