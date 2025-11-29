'use client'

import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { onboardingSchema, OnboardingData } from './types'
import Step1About from './Step1About'
import Step2Investments from './Step2Investments'
import Step3LoanInsurance from './Step3LoanInsurance'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const STORAGE_KEY = 'onboarding_data'
const STEP_KEY = 'onboarding_step'

export default function MultiStepForm() {
  const [step, setStep] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  const methods = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onChange'
  })

  const { watch, reset } = methods

  // Load data from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    const savedStep = localStorage.getItem(STEP_KEY)

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        reset(parsedData)
      } catch (e) {
        console.error('Failed to parse saved data', e)
      }
    }

    if (savedStep) {
      setStep(parseInt(savedStep, 10))
    }
    setIsLoaded(true)
  }, [reset])

  // Save data to local storage on change
  useEffect(() => {
    if (!isLoaded) return

    const subscription = watch((value: unknown) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    })

    return () => subscription.unsubscribe()
  }, [watch, isLoaded])

  // Save step to local storage
  useEffect(() => {
    if (!isLoaded) return
    localStorage.setItem(STEP_KEY, step.toString())
  }, [step, isLoaded])

  const nextStep = () => setStep((s) => Math.min(s + 1, 3))
  const prevStep = () => setStep((s) => Math.max(s - 1, 1))

  const onSubmit = (data: OnboardingData) => {
    console.log('Form Submitted:', data)
    alert('Form Submitted! Check console for data.')
    // Clear storage on successful submit if desired, but for now keeping it as per "save data... for time being"
  }

  if (!isLoaded) return null // Or a loading spinner

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4 text-white">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-xl">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {step === 1 && <Step1About onNext={nextStep} />}
            {step === 2 && (
              <Step2Investments onNext={nextStep} onBack={prevStep} />
            )}
            {step === 3 && (
              <Step3LoanInsurance
                onBack={prevStep}
                onSubmit={methods.handleSubmit(onSubmit)}
              />
            )}
          </form>
        </FormProvider>
        {step === 3 && (
          <div className="mt-10 flex w-full items-center justify-center">
            <Button
              className="self-center"
              onClick={() => {
                const query = `Based on my profile, generate a financial plan for me?`
                router.push(`/?q=${encodeURIComponent(query)}`)
              }}
            >
              Generate Personalized Plan
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
