'use server'

import { Symbol } from '@/types/os'

const SEARCH_URL = process.env.SEARCH_URL

export const search = async (query: string, search_type: string) => {
  try {
    const params = new URLSearchParams({
      text: query,
      search_type
    })

    console.log(params.toString())

    const res = await fetch(`${SEARCH_URL}&${params.toString()}`).then((res) =>
      res.json()
    )
    return res?.symbols as Symbol[]
  } catch (err) {
    console.log(err)
  }
}
