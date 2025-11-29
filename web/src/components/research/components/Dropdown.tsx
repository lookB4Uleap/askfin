'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronsUpDown } from 'lucide-react'

export function DropdownMenuCheckboxes(props: {
  index: number
  list: string[]
  onChange: (index: number) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {props.list[props.index]}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-zinc-900 p-0">
        {/* <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        {props?.list.map((val, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            checked={false}
            onCheckedChange={() => props.onChange(index)}
          >
            {val}
          </DropdownMenuCheckboxItem>
        ))}

        {/* <DropdownMenuCheckboxItem
          checked={false}
          onCheckedChange={setShowPanel}
        >
          Panel
        </DropdownMenuCheckboxItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
