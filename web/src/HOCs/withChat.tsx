import useChatActions from '@/hooks/useChatActions'
import React, { ComponentType, useEffect } from 'react'

/**
 * A Higher-Order Component to provide initialized chat functionality to a component.
 * @param WrappedComponent The component to initialize chat functionality.
 */
const withChat = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ComponentWithChat = (props: P) => {
    const { initialize } = useChatActions()

    useEffect(() => {
      initialize()
    }, [initialize])

    return <WrappedComponent {...props} />
  }

  return ComponentWithChat
}

export default withChat
