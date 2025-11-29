import React, { useEffect, useRef } from 'react'

const MiniChart = (props: { symbol: string }) => {
  // TradingViewWidget.jsx
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    const baseUrl = window.location.origin
    console.log('origin', baseUrl)

    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = `
        {
          "symbol": "${props.symbol}",
          "chartOnly": false,
          "dateRange": "12M",
          "noTimeScale": false,
          "colorTheme": "dark",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "autosize": true,
          "height": "100%",
          "largeChartUrl": "${baseUrl}/research/${props.symbol}"
        }`
    container?.current?.appendChild(script)
  }, [props.symbol])

  return (
    <div className="h-48 min-w-52">
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  )
}

export default MiniChart
