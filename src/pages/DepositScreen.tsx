"use client"

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, AlertCircle, Lock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export default function DepositScreen() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const MIN_DEPOSIT = 1000
    const MAX_DEPOSIT = 5000000

    const handleAmountChange = (e) => {
        const value = e.target.value
        setAmount(value)
        setError('')

        if (value && !/^\d+$/.test(value)) {
            setError('Please enter a valid number')
        } else if (Number(value) < MIN_DEPOSIT) {
            setError(`Minimum deposit is ₦${MIN_DEPOSIT.toLocaleString()}`)
        } else if (Number(value) > MAX_DEPOSIT) {
            setError(`Maximum deposit is ₦${MAX_DEPOSIT.toLocaleString()}`)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!amount || error) return

        setIsLoading(true)
        // Simulating redirect to Paystack
        setTimeout(() => {
            alert('Redirecting to Paystack...')
            setIsLoading(false)
        }, 2000)
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Button variant="ghost" size="icon" onClick={() => { navigate(-1) }}>
                                <ArrowLeft className="h-6 w-6" />
                            </Button>
                            <h1 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">Deposit Funds</h1>
                        </div>
                        <div className="flex-shrink-0">
                            <img className="h-8 w-auto" src="/logo.svg" alt="NexusTrader" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md">
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Enter Deposit Amount</CardTitle>
                            <CardDescription>
                                Minimum deposit: ₦{MIN_DEPOSIT.toLocaleString()} | Maximum deposit: ₦{MAX_DEPOSIT.toLocaleString()}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="amount">Amount (₦)</Label>
                                    <Input
                                        id="amount"
                                        placeholder="Enter amount"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        className="text-2xl"
                                    />
                                </div>
                                {error && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}
                                {amount && !error && (
                                    <Alert>
                                        <AlertTitle>Deposit Summary</AlertTitle>
                                        <AlertDescription>
                                            Amount to Deposit: ₦{Number(amount).toLocaleString()}
                                            <br />
                                            Total to Pay: ₦{Number(amount).toLocaleString()}
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Button
                                className="w-full"
                                type="submit"
                                disabled={!amount || !!error || isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Progress value={33} className="w-full" />
                                        Redirecting to Paystack...
                                    </>
                                ) : (
                                    'Proceed to Paystack Checkout'
                                )}
                            </Button>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
                                <Lock className="h-4 w-4 mr-2" />
                                Secure Payment via Paystack
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 text-center">
                                Available payment methods: Debit/Credit Card, Bank Transfer, USSD
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </main>
        </div>
    )
}