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
import { Step1Data } from './types'

// Simple Input component since it's missing from UI lib
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

// Simple Label component
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

export default function Step1About({ onNext }: { onNext: () => void }) {
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<Step1Data>()

  // Watch values for Select components to show selected value
  const gender = watch('gender')
  const occupation = watch('occupation')
  const annualIncome = watch('annualIncome')
  const monthlyExpenses = watch('monthlyExpenses')
  const monthlySavings = watch('monthlySavings')

  const handleNext = async () => {
    onNext()
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-4 space-y-6 duration-500">
      <div className="space-y-2">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <span className="text-2xl">👤</span> About You
        </h2>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Your name"
            className="bg-muted/50"
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              {...register('age')}
              placeholder="age"
              className="bg-muted/50"
            />
            {errors.age && (
              <p className="text-xs text-red-500">{errors.age.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <Select
              onValueChange={(val) => setValue('gender', val)}
              defaultValue={gender}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-xs text-red-500">{errors.gender.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Occupation</Label>
            <Select
              onValueChange={(val) => setValue('occupation', val)}
              defaultValue={occupation}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Occupation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Retired">Retired</SelectItem>
              </SelectContent>
            </Select>
            {errors.occupation && (
              <p className="text-xs text-red-500">
                {errors.occupation.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Annual Income</Label>
            <Select
              onValueChange={(val) => setValue('annualIncome', val)}
              defaultValue={annualIncome}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Income" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="<5L">&lt; ₹5L</SelectItem>
                <SelectItem value="5L - 12L">₹5L - ₹12L</SelectItem>
                <SelectItem value="12L - 25L">₹12L - ₹25L</SelectItem>
                <SelectItem value=">25L">&gt; ₹25L</SelectItem>
              </SelectContent>
            </Select>
            {errors.annualIncome && (
              <p className="text-xs text-red-500">
                {errors.annualIncome.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Monthly Expenses</Label>
            <Select
              onValueChange={(val) => setValue('monthlyExpenses', val)}
              defaultValue={monthlyExpenses}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Expenses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="<25k">&lt; ₹25k</SelectItem>
                <SelectItem value="25k - 50k">₹25k - ₹50k</SelectItem>
                <SelectItem value=">50k">&gt; ₹50k</SelectItem>
              </SelectContent>
            </Select>
            {errors.monthlyExpenses && (
              <p className="text-xs text-red-500">
                {errors.monthlyExpenses.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Monthly Savings</Label>
            <Select
              onValueChange={(val) => setValue('monthlySavings', val)}
              defaultValue={monthlySavings}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Savings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="<25k">&lt; ₹25k</SelectItem>
                <SelectItem value="25k - 50k">₹25k - ₹50k</SelectItem>
                <SelectItem value=">50k">&gt; ₹50k</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Total Investments (approx.)</Label>
            <div className="relative">
              <span className="text-muted-foreground absolute left-3 top-2.5">
                ₹
              </span>
              <Input {...register('totalInvestments')} className="pl-7" />
            </div>
          </div>
          <div className="space-y-2">
            {/* Empty placeholder for grid alignment if needed, or just empty */}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <span className="text-muted-foreground text-sm">step 1/3</span>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onNext}>
            SKIP
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
