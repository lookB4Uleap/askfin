import React from 'react'

// const news = [1, 2, 3, 4, 5]

// TODO: Fetch this from a API
const news = [
  {
    title: 'Economy / GDP growth',
    article:
      'India’s Q2 GDP grew 8.2%, a six-quarter high, driven by strong rural demand and growth in manufacturing, services and private consumption'
  },
  {
    title: 'Stock Market — benchmark indices',
    article:
      'Nifty50 and Sensex hit fresh lifetime highs for the first time — Nifty crossed 26,300 and Sensex crossed 86,000'
  },
  {
    title: 'Stock Market — monthly trend',
    article:
      'Indian equity benchmarks logged a third straight monthly gain in November, boosted by improving earnings, expectations of rate cuts and easing valuations'
  },
  {
    title: 'Economy — outlook & reforms',
    article:
      'The finance ministry says India enters H2 FY26 on a strong footing, citing easing inflation, robust domestic demand and recent GST reforms as key demand drivers'
  }
]

const HeadLine = (props: { title: string; article: string }) => {
  return (
    <div className="my-5 w-full">
      <div className="text-md font-bold">{props?.title}</div>
      <div className="text-sm">{props?.article}</div>
    </div>
  )
}

const Headlines = () => {
  return (
    <div className="flex w-full flex-col p-5">
      <h2 className="text-2xl font-bold">Headlines</h2>
      <div className="w-full flex-col gap-5">
        {news.map((item, index) => (
          <HeadLine key={index} title={item.title} article={item.article} />
        ))}
      </div>
    </div>
  )
}

export default Headlines
