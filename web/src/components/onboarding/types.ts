import { z } from 'zod'

export const step1Schema = z.object({
  name: z.string().optional(),
  age: z.string().optional(),
  gender: z.string().optional(),
  occupation: z.string().optional(),
  annualIncome: z.string().optional(),
  monthlyExpenses: z.string().optional(),
  monthlySavings: z.string().optional(),
  totalInvestments: z.string().optional()
})

export const step2Schema = z.object({
  riskAppetite: z.string().optional(),
  priority: z.string().optional(),
  investments: z.array(z.string()).optional(),
  investmentAmounts: z.record(z.string(), z.string()).optional() // Map investment type to amount
})

export const step3Schema = z.object({
  hasLoans: z.string().optional(),
  loanTypes: z.array(z.string()).optional(),
  totalEMI: z.string().optional(),
  hasInsurance: z.string().optional(),
  insuranceTypes: z.array(z.string()).optional(),
  totalPremium: z.string().optional(),
  hasEmergencyFund: z.string().optional(),
});

export const onboardingSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)

export type Step1Data = z.infer<typeof step1Schema>
export type Step2Data = z.infer<typeof step2Schema>
export type Step3Data = z.infer<typeof step3Schema>
export type OnboardingData = z.infer<typeof onboardingSchema>
