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
import { Step3Data } from './types'

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

const LOAN_TYPES = [
  'Student Loan',
  'Home Loan',
  'Personal Loan',
  'Vehicle Loan',
  'Loan against securities',
  'Others'
]

const INSURANCE_TYPES = ['Term Life', 'Health', 'ULIP', 'Vehicle', 'Others']

export default function Step3LoanInsurance({
  onBack,
  onSubmit
}: {
  onBack: () => void
  onSubmit: () => void
}) {
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<Step3Data>()

  const hasLoans = watch('hasLoans')
  const hasInsurance = watch('hasInsurance')
  const hasEmergencyFund = watch('hasEmergencyFund')
  const loanTypes = watch('loanTypes') || []
  const insuranceTypes = watch('insuranceTypes') || []

  const handleLoanTypeChange = (option: string, checked: boolean) => {
    let newTypes = [...loanTypes]
    if (checked) {
      newTypes.push(option)
    } else {
      newTypes = newTypes.filter((t) => t !== option)
    }
    setValue('loanTypes', newTypes)
  }

  const handleInsuranceTypeChange = (option: string, checked: boolean) => {
    let newTypes = [...insuranceTypes]
    if (checked) {
      newTypes.push(option)
    } else {
      newTypes = newTypes.filter((t) => t !== option)
    }
    setValue('insuranceTypes', newTypes)
  }

  const handleSubmit = async () => {
    onSubmit()
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-4 space-y-6 duration-500">
      <div className="space-y-2">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <span className="text-2xl">◈</span> Loan & Insurance
        </h2>
      </div>

      <div className="space-y-6">
        {/* Loans Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-[1fr_200px] items-center gap-4">
            <Label>Do you have any current loans/EMI?</Label>
            <div className="space-y-1">
              <Select
                onValueChange={(val) => setValue('hasLoans', val)}
                defaultValue={hasLoans}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
              {errors.hasLoans && (
                <p className="text-xs text-red-500">
                  {errors.hasLoans.message}
                </p>
              )}
            </div>
          </div>

          {hasLoans === 'Yes' && (
            <div className="grid grid-cols-2 gap-4 pl-1">
              <div className="space-y-2">
                <Label>Type of Loan</Label>
                <div className="border-input bg-muted/20 space-y-3 rounded-md border p-4">
                  {LOAN_TYPES.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`loan-${type}`}
                        checked={loanTypes.includes(type)}
                        onCheckedChange={(checked) =>
                          handleLoanTypeChange(type, checked)
                        }
                      />
                      <Label
                        htmlFor={`loan-${type}`}
                        className="cursor-pointer font-normal"
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Total EMI</Label>
                <div className="relative">
                  <span className="text-muted-foreground absolute left-3 top-2.5 text-xs">
                    ₹
                  </span>
                  <Input
                    {...register('totalEMI')}
                    className="bg-muted/20 pl-6"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Insurance Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-[1fr_200px] items-center gap-4">
            <Label>Do you have insurance?</Label>
            <div className="space-y-1">
              <Select
                onValueChange={(val) => setValue('hasInsurance', val)}
                defaultValue={hasInsurance}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
              {errors.hasInsurance && (
                <p className="text-xs text-red-500">
                  {errors.hasInsurance.message}
                </p>
              )}
            </div>
          </div>

          {hasInsurance === 'Yes' && (
            <div className="grid grid-cols-2 gap-4 pl-1">
              <div className="space-y-2">
                <Label>Type of Insurance</Label>
                <div className="border-input bg-muted/20 space-y-3 rounded-md border p-4">
                  {INSURANCE_TYPES.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`insurance-${type}`}
                        checked={insuranceTypes.includes(type)}
                        onCheckedChange={(checked) =>
                          handleInsuranceTypeChange(type, checked)
                        }
                      />
                      <Label
                        htmlFor={`insurance-${type}`}
                        className="cursor-pointer font-normal"
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Total Premium</Label>
                <div className="relative">
                  <span className="text-muted-foreground absolute left-3 top-2.5 text-xs">
                    ₹
                  </span>
                  <Input
                    {...register('totalPremium')}
                    className="bg-muted/20 pl-6"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Emergency Fund Section */}
        <div className="grid grid-cols-[1fr_200px] items-center gap-4">
          <Label>Do you have emergency fund?</Label>
          <div className="space-y-1">
            <Select
              onValueChange={(val) => setValue('hasEmergencyFund', val)}
              defaultValue={hasEmergencyFund}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
            {errors.hasEmergencyFund && (
              <p className="text-xs text-red-500">
                {errors.hasEmergencyFund.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-8">
        <span className="text-muted-foreground text-sm">step 3/3</span>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onSubmit}>
            SKIP
          </Button>
          <Button variant="outline" onClick={onBack}>
            BACK
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-pink-300 text-black hover:bg-pink-400"
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  )
}
