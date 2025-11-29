import React from 'react'
import Chart from '../widgets/Chart'

import { useQueryState } from 'nuqs'

const Widget = () => {
  const [symbol] = useQueryState('symbol', { defaultValue: '' })
  const [type] = useQueryState('type', { defaultValue: '' })
  const [tvwidgetsymbol] = useQueryState('tvwidgetsymbol', { defaultValue: '' })

  console.log({ symbol, type, tvwidgetsymbol })

  if (tvwidgetsymbol !== '') return <Chart symbol={tvwidgetsymbol} />

  if (symbol === '' || type === '') return null

  if (type === 'chart') {
    return <Chart symbol={symbol} />
  } else return null
}

export default Widget
