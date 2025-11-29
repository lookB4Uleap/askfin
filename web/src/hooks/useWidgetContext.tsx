import { useQueryState } from 'nuqs'

export const useWidgetContext = () => {
  const [symbol] = useQueryState('symbol', { defaultValue: '' })
  const [type] = useQueryState('type', { defaultValue: '' })
  const [tvwidgetsymbol] = useQueryState('tvwidgetsymbol', { defaultValue: '' })

  if (tvwidgetsymbol !== '')
    return `Please search in context of this stock or index or asset ${tvwidgetsymbol}`
  if (symbol === '' || type === '') return ''
  else
    return `Please search in context of this stock or index or asset ${symbol}`
}
