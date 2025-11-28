'use server'

const url = process.env.AGENT_URL

export const getEndpoint = async () => {
  console.log({ url })

  return url
}
