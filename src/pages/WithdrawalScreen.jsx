"use client"

import React, { useState } from 'react'
import { ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function WithdrawalScreen() {
    const [amount, setAmount] = useState('')
    const [withdrawalMethod, setWithdrawalMethod] = useState('')
    const [bankName, setBankName] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [accountHolderName, setAccountHolderName] = useState('')
    const [eWalletProvider, setEWalletProvider] = useState('')
    const [eWalletAccountId, setEWalletAccountId] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const MIN_WITHDRAWAL = 500
    const MAX_WITHDRAWAL = 1000000
    const AVAILABLE_BALANCE = 10000
    const WITHDRAWAL_FEE = 50

    const handleAmountChange = (e) => {
        const value = e.target.value
        setAmount(value)
        setError('')

        if (value && !/^\d+$/.test(value)) {
            setError('Please enter a valid number')
        } else if (Number(value) < MIN_WITHDRAWAL) {
            setError(`Minimum withdrawal is ₦${MIN_WITHDRAWAL.toLocaleString()}`)
        } else if (Number(value) > MAX_WITHDRAWAL) {
            setError(`Maximum withdrawal is ₦${MAX_WITHDRAWAL.toLocaleString()}`)
        } else if (Number(value) > AVAILABLE_BALANCE) {
            setError(`Insufficient funds. Your available balance is ₦${AVAILABLE_BALANCE.toLocaleString()}`)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!amount || error || !withdrawalMethod) return

        setIsLoading(true)
        // Simulating API call
        setTimeout(() => {
            setIsLoading(false)
            setIsSuccess(true)
        }, 2000)
    }

    const resetForm = () => {
        setAmount('')
        setWithdrawalMethod('')
        setBankName('')
        setAccountNumber('')
        setAccountHolderName('')
        setEWalletProvider('')
        setEWalletAccountId('')
        setError('')
        setIsSuccess(false)
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-6 w-6" />
                            </Button>
                            <h1 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">Withdraw Funds</h1>
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
                            <CardTitle>Request Withdrawal</CardTitle>
                            <CardDescription>
                                Available Balance: ₦{AVAILABLE_BALANCE.toLocaleString()}
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
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Minimum: ₦{MIN_WITHDRAWAL.toLocaleString()} | Maximum: ₦{MAX_WITHDRAWAL.toLocaleString()}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label>Withdrawal Method</Label>
                                    <RadioGroup onValueChange={setWithdrawalMethod} value={withdrawalMethod}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="bank" id="bank" />
                                            <Label htmlFor="bank">Bank Transfer</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="ewallet" id="ewallet" />
                                            <Label htmlFor="ewallet">E-Wallet</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {withdrawalMethod === 'bank' && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="bankName">Bank Name</Label>
                                            <Input
                                                id="bankName"
                                                value={bankName}
                                                onChange={(e) => setBankName(e.target.value)}
                                                placeholder="Enter bank name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="accountNumber">Account Number</Label>
                                            <Input
                                                id="accountNumber"
                                                value={accountNumber}
                                                onChange={(e) => setAccountNumber(e.target.value)}
                                                placeholder="Enter account number"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="accountHolderName">Account Holder Name</Label>
                                            <Input
                                                id="accountHolderName"
                                                value={accountHolderName}
                                                onChange={(e) => setAccountHolderName(e.target.value)}
                                                placeholder="Enter account holder name"
                                            />
                                        </div>
                                    </div>
                                )}

                                {withdrawalMethod === 'ewallet' && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="eWalletProvider">E-Wallet Provider</Label>
                                            <Select onValueChange={setEWalletProvider} value={eWalletProvider}>
                                                <SelectTrigger id="eWalletProvider">
                                                    <SelectValue placeholder="Select e-wallet provider" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="paypal">PayPal</SelectItem>
                                                    <SelectItem value="mobileMoney">Mobile Money</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="eWalletAccountId">E-Wallet Account ID</Label>
                                            <Input
                                                id="eWalletAccountId"
                                                value={eWalletAccountId}
                                                onChange={(e) => setEWalletAccountId(e.target.value)}
                                                placeholder="Enter e-wallet account ID or email"
                                            />
                                        </div>
                                    </div>
                                )}

                                {error && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                {amount && !error && withdrawalMethod && (
                                    <Alert>
                                        <AlertTitle>Withdrawal Summary</AlertTitle>
                                        <AlertDescription>
                                            Amount to Withdraw: ₦{Number(amount).toLocaleString()}
                                            <br />
                                            Withdrawal Fee: ₦{WITHDRAWAL_FEE.toLocaleString()}
                                            <br />
                                            Total Withdrawal Amount: ₦{(Number(amount) - WITHDRAWAL_FEE).toLocaleString()}
                                            <br />
                                            Remaining Balance: ₦{(AVAILABLE_BALANCE - Number(amount)).toLocaleString()}
                                            <br />
                                            Method: {withdrawalMethod === 'bank' ? 'Bank Transfer' : 'E-Wallet'}
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        className="w-full"
                                        type="submit"
                                        disabled={!amount || !!error || !withdrawalMethod || isLoading}
                                    >
                                        {isLoading ? 'Processing...' : 'Request Withdrawal'}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Confirm Withdrawal</DialogTitle>
                                        <DialogDescription>
                                            Are you sure you want to withdraw ₦{Number(amount).toLocaleString()} to your {withdrawalMethod === 'bank' ? 'bank account' : 'e-wallet'}?
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => { }}>Cancel</Button>
                                        <Button onClick={handleSubmit}>Confirm Withdrawal</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            {isSuccess && (
                                <Alert>
                                    <CheckCircle2 className="h-4 w-4" />
                                    <AlertTitle>Success</AlertTitle>
                                    <AlertDescription>Your withdrawal request has been submitted successfully. Funds will be transferred within 24 hours.</AlertDescription>
                                </Alert>
                            )}
                            <div className="text-xs text-gray-400 dark:text-gray-500 text-center">
                                Please note that withdrawals are processed within 24 hours. For any issues, contact our support team.
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </main>
        </div>
    )
}