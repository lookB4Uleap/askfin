'use client'

import { Check, SearchIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useEffect, useState } from 'react'
import { search } from '@/lib/search'
import { Symbol } from '@/types/os'
import { DropdownMenuCheckboxes } from './Dropdown'

// const initFrameworks = [
//   {
//     value: 'next.js',
//     label: 'Next.js'
//   },
//   {
//     value: 'sveltekit',
//     label: 'SvelteKit'
//   },
//   {
//     value: 'nuxt.js',
//     label: 'Nuxt.js'
//   },
//   {
//     value: 'remix',
//     label: 'Remix'
//   },
//   {
//     value: 'astro',
//     label: 'Astro'
//   }
// ]

const options = ['stock', 'index']

export function Search() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [results, setResults] = useState<Symbol[]>([])
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      ;(async () => {
        const symbols = await search(query, options[index])
        setResults(() => [...(symbols?.slice(0, 10) ?? [])])
      })()
    }, 200) // 300ms debounce delay

    return () => {
      clearTimeout(timer)
    }
  }, [index, query])

  const handleQuery = async (query: string) => {
    // We only update the query state here.
    // The actual search is performed in the debounced useEffect.
    setQuery(query)
  }

  return (
    <div className="flex gap-5">
      <DropdownMenuCheckboxes
        index={index}
        list={options}
        onChange={(index) => setIndex(index)}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[400px] max-w-xl justify-between"
          >
            {value
              ? results
                  .find((result) => result.symbol === value)
                  ?.symbol.replaceAll('<em>', '')
                  .replaceAll('</em>', '')
              : 'Search stock or index...'}
            {/* <ChevronsUpDown className="opacity-50" /> */}
            <SearchIcon className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] max-w-xl bg-zinc-900 p-0">
          <Command>
            <CommandInput
              placeholder="Search stock or index..."
              className="h-9"
              value={query}
              onValueChange={handleQuery}
            />
            <CommandList>
              <CommandEmpty>No stock or index found.</CommandEmpty>
              <CommandGroup>
                {results.map((result) => (
                  <CommandItem
                    key={result.symbol}
                    value={`${result.symbol}`}
                    className="text-white hover:cursor-pointer"
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue)
                      setOpen(false)
                      const symbol = `${result.exchange}:${result.symbol.replaceAll('<em>', '').replaceAll('</em>', '')}`
                      window.open(
                        `/research/${symbol}?type=chart&symbol=${symbol}`,
                        '_blank'
                      )
                    }}
                  >
                    {/* <Link href={`/research/${result.exchange}:${result.symbol.replaceAll('<em>', '').replaceAll('</em>', '')}`} >
                    </Link> */}
                    <span className="mr-3">
                      {result.description
                        .replaceAll('<em>', '')
                        .replaceAll('</em>', '')}
                    </span>
                    {'    '}
                    {result.symbol
                      .replaceAll('<em>', '')
                      .replaceAll('</em>', '')}
                    <Check
                      className={cn(
                        'ml-auto',
                        value === result.symbol ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
