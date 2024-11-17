
import React, { useState, useEffect } from 'react'
import { Bell, ChevronDown, Home, Wallet, BarChart2, ArrowUp, ArrowDown, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import Chart1 from "@/data-chart/line"
import { ChartWrapper } from "@/data-chart/wrapper"

export default function TradeExecutionScreen() {
    const [tradeAmount, setTradeAmount] = useState('')
    const [multiplier, setMultiplier] = useState('')
    const [prediction, setPrediction] = useState('')
    const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
    const [isTradeValid, setIsTradeValid] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 300))
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        setIsTradeValid(tradeAmount !== '' && multiplier !== '' && prediction !== '')
    }, [tradeAmount, multiplier, prediction])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const getTimerColor = () => {
        const percentage = (timeLeft / 300) * 100
        return `hsl(${percentage}, 100%, 50%)`
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-gray-800">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold">NexusTrader</h1>
                    <nav>
                        <Button variant="ghost" size="sm"><Home className="mr-2 h-4 w-4" /> Dashboard</Button>
                        <Button variant="ghost" size="sm"><BarChart2 className="mr-2 h-4 w-4" /> Trading Overview</Button>
                        <Button variant="ghost" size="sm"><Wallet className="mr-2 h-4 w-4" /> Wallet</Button>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <span>John Doe</span>
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <main className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Trade Execution Form */}
                    <Card className="bg-gray-800 border-gray-700 lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Place Your Trade</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="tradeAmount">Trade Amount (Naira)</Label>
                                <Input
                                    id="tradeAmount"
                                    type="number"
                                    placeholder="Enter amount"
                                    value={tradeAmount}
                                    onChange={(e) => setTradeAmount(e.target.value)}
                                />
                                <p className="text-xs text-gray-400 mt-1">Min: 1,000 Naira | Max: 1,000,000 Naira</p>
                            </div>

                            <div>
                                <Label htmlFor="multiplier">Multiplier</Label>
                                <Select onValueChange={setMultiplier}>
                                    <SelectTrigger id="multiplier">
                                        <SelectValue placeholder="Select multiplier" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10x</SelectItem>
                                        <SelectItem value="20">20x</SelectItem>
                                        <SelectItem value="50">50x</SelectItem>
                                    </SelectContent>
                                </Select>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="sm" className="p-0 h-auto">
                                                <Info className="h-4 w-4 text-gray-400" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Multipliers increase your potential profit, but also your potential loss.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>

                            <div>
                                <Label>Price Prediction</Label>
                                <div className="flex space-x-2 mt-1">
                                    <Button
                                        variant={prediction === 'up' ? 'default' : 'outline'}
                                        className="w-full"
                                        onClick={() => setPrediction('up')}
                                    >
                                        <ArrowUp className="mr-2 h-4 w-4" /> Up
                                    </Button>
                                    <Button
                                        variant={prediction === 'down' ? 'default' : 'outline'}
                                        className="w-full"
                                        onClick={() => setPrediction('down')}
                                    >
                                        <ArrowDown className="mr-2 h-4 w-4" /> Down
                                    </Button>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-lg font-semibold">Time to Expiry</p>
                                <p className="text-3xl font-bold" style={{ color: getTimerColor() }}>
                                    {formatTime(timeLeft)}
                                </p>
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-full" disabled={!isTradeValid}>
                                        Place Trade
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Confirm Your Trade</DialogTitle>
                                        <DialogDescription>
                                            Please review your trade details before confirming.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="amount" className="text-right">
                                                Amount
                                            </Label>
                                            <div className="col-span-3">
                                                {tradeAmount} Naira
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="multiplier" className="text-right">
                                                Multiplier
                                            </Label>
                                            <div className="col-span-3">
                                                {multiplier}x
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="prediction" className="text-right">
                                                Prediction
                                            </Label>
                                            <div className="col-span-3">
                                                {prediction.toUpperCase()}
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Confirm Trade</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>

                    {/* Real-Time Chart */}
                    <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Real-Time Market Data</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="1h">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="1m">1 min</TabsTrigger>
                                    <TabsTrigger value="5m">5 min</TabsTrigger>
                                    <TabsTrigger value="1h">1 hour</TabsTrigger>
                                    <TabsTrigger value="1d">1 day</TabsTrigger>
                                </TabsList>
                                <TabsContent value="1h">
                                    <ChartWrapper
                                        content={Chart1}
                                        className="h-[400px]"
                                        title="Asset Price Chart"
                                    />
                                </TabsContent>
                                {/* Add other TabsContent for different time ranges */}
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}