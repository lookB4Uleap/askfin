import React from 'react'
import { useFormContext } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Step2Data } from './types'

// Simple Checkbox component
const Checkbox = React.forwardRef<
  HTMLButtonElement,
  {
    checked?: boolean
    onCheckedChange: (checked: boolean) => void
    id?: string
    className?: string
  }
>(({ checked, onCheckedChange, id, className }, ref) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    id={id}
    ref={ref}
    onClick={() => onCheckedChange(!checked)}
    className={`border-primary ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer h-5 w-5 shrink-0 rounded-sm border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
      checked
        ? 'bg-primary text-primary-foreground'
        : 'border-input bg-background'
    } ${className}`}
  >
    {checked && (
      <span className="flex items-center justify-center text-current">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    )}
  </button>
))
Checkbox.displayName = 'Checkbox'

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

const Label = ({
  children,
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  >
    {children}
  </label>
)

const INVESTMENT_OPTIONS = [
  "I don't Invest",
  'Mutual Funds',
  'Fixed Deposits',
  'Stocks or ETFs',
  'Real Estate',
  'Gold / Silver',
  'PPF / NPS',
  'Crypto',
  'Others'
]

export default function Step2Investments({
  onNext,
  onBack
}: {
  onNext: () => void
  onBack: () => void
}) {
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<Step2Data>()

  const riskAppetite = watch('riskAppetite')
  const priority = watch('priority')
  const investments = watch('investments') || []
  const investmentAmounts = watch('investmentAmounts') || {}

  const handleInvestmentChange = (option: string, checked: boolean) => {
    let newInvestments = [...investments]
    if (checked) {
      if (option === "I don't Invest") {
        newInvestments = ["I don't Invest"]
        setValue('investmentAmounts', {}) // Clear amounts
      } else {
        newInvestments = newInvestments.filter((i) => i !== "I don't Invest")
        newInvestments.push(option)
      }
    } else {
      newInvestments = newInvestments.filter((i) => i !== option)
      // Remove amount if unchecked
      const newAmounts = { ...investmentAmounts }
      delete newAmounts[option]
      setValue('investmentAmounts', newAmounts)
    }
    setValue('investments', newInvestments)
  }

  const handleNext = async () => {
    onNext()
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-4 space-y-6 duration-500">
      <div className="space-y-2">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <span className="text-2xl">📈</span> Investments
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>How would you describe your risk appetite?</Label>
          <Select
            onValueChange={(val) => setValue('riskAppetite', val)}
            defaultValue={riskAppetite}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Risk" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Moderate">Moderate</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
          {errors.riskAppetite && (
            <p className="text-xs text-red-500">
              {errors.riskAppetite.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label>What matters most to you right now?</Label>
          <Select
            onValueChange={(val) => setValue('priority', val)}
            defaultValue={priority}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Safety">Safety</SelectItem>
              <SelectItem value="Returns">Returns</SelectItem>
              <SelectItem value="Liquidity">Liquidity</SelectItem>
            </SelectContent>
          </Select>
          {errors.priority && (
            <p className="text-xs text-red-500">{errors.priority.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base">Where you have invested your money?</Label>
        <div className="space-y-3">
          {INVESTMENT_OPTIONS.map((option) => {
            const isChecked = investments.includes(option)
            const showAmount = isChecked && option !== "I don't Invest"

            return (
              <div key={option} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      handleInvestmentChange(option, checked)
                    }
                  />
                  <Label
                    htmlFor={option}
                    className="cursor-pointer font-normal"
                  >
                    {option}
                  </Label>
                </div>
                {showAmount && (
                  <div className="relative w-32">
                    <span className="text-muted-foreground absolute left-3 top-2.5 text-xs">
                      ₹
                    </span>
                    <Input
                      placeholder="Amount"
                      className="h-9 pl-6 text-right"
                      {...register(`investmentAmounts.${option}`)}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <span className="text-muted-foreground text-sm">step 2/3</span>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onNext}>
            SKIP
          </Button>
          <Button variant="outline" onClick={onBack}>
            BACK
          </Button>
          <Button
            onClick={handleNext}
            className="bg-orange-600 text-black hover:bg-orange-700"
          >
            NEXT
          </Button>
        </div>
      </div>
    </div>
  )
}
