"use client"

import React from 'react';
import { useState, useEffect } from 'react'
import { ArrowLeft, Bell, ChevronDown, Home, Wallet, BarChart2, ArrowUp, ArrowDown, RefreshCw, X, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// Mock data for active trades
const mockTrades = [
    {
        id: 1,
        status: 'Active',
        asset: 'S&P 500 Synthetic',
        amount: 5000,
        prediction: 'Up',
        multiplier: 50,
        currentPrice: 1250.00,
        profit: 10000,
        timeRemaining: 90,
        expiryTime: '2:00 PM',
    },
    {
        id: 2,
        status: 'Active',
        asset: 'Volatility 75 Index',
        amount: 3000,
        prediction: 'Down',
        multiplier: 20,
        currentPrice: 980.50,
        profit: -500,
        timeRemaining: 180,
        expiryTime: '2:15 PM',
    },
    // Add more mock trades as needed
]

export default function LiveTradesScreen() {
    const [trades, setTrades] = useState(mockTrades)
    const [sortBy, setSortBy] = useState('timeRemaining')
    const [filterStatus, setFilterStatus] = useState('All')

    useEffect(() => {
        const timer = setInterval(() => {
            setTrades(prevTrades =>
                prevTrades.map(trade => ({
                    ...trade,
                    timeRemaining: Math.max(0, trade.timeRemaining - 1),
                    currentPrice: trade.currentPrice + (Math.random() - 0.5) * 10,
                    profit: trade.profit + (Math.random() - 0.5) * 1000,
                }))
            )
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const sortedAndFilteredTrades = trades
        .filter(trade => filterStatus === 'All' || trade.status === filterStatus)
        .sort((a, b) => {
            if (sortBy === 'timeRemaining') return a.timeRemaining - b.timeRemaining
            if (sortBy === 'profit') return b.profit - a.profit
            if (sortBy === 'amount') return b.amount - a.amount
            return 0
        })

    const totalActiveTrades = trades.length
    const totalInvested = trades.reduce((sum, trade) => sum + trade.amount, 0)
    const totalProfit = trades.reduce((sum, trade) => sum + trade.profit, 0)

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const handleCloseTrade = (tradeId) => {
        setTrades(prevTrades => prevTrades.filter(trade => trade.id !== tradeId))
    }

    const handleRefresh = () => {
        // In a real app, this would fetch the latest trade data from the server
        console.log('Refreshing trade data...')
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-gray-800">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold">NexusTrader</h1>
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm"><Home className="mr-2 h-4 w-4" /> Dashboard</Button>
                    <Button variant="ghost" size="sm"><BarChart2 className="mr-2 h-4 w-4" /> Trading Overview</Button>
                    <Button variant="ghost" size="sm"><Wallet className="mr-2 h-4 w-4" /> Wallet</Button>
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
                {/* Trade Summary */}
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-2xl">Trade Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <Label className="text-gray-400">Total Active Trades</Label>
                            <p className="text-2xl font-bold">{totalActiveTrades}</p>
                        </div>
                        <div>
                            <Label className="text-gray-400">Total Invested</Label>
                            <p className="text-2xl font-bold">{totalInvested.toLocaleString()} Naira</p>
                        </div>
                        <div>
                            <Label className="text-gray-400">Total Profit/Loss</Label>
                            <p className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {totalProfit.toLocaleString()} Naira
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Controls */}
                <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="timeRemaining">Time Remaining</SelectItem>
                                <SelectItem value="profit">Profit/Loss</SelectItem>
                                <SelectItem value="amount">Amount Invested</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Expired">Expired</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={handleRefresh}>
                        <RefreshCw className="mr-2 h-4 w-4" /> Refresh
                    </Button>
                </div>

                {/* Active Trades List */}
                {sortedAndFilteredTrades.length > 0 ? (
                    <div className="space-y-4">
                        {sortedAndFilteredTrades.map(trade => (
                            <Card key={trade.id} className="bg-gray-800 border-gray-700">
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-gray-400">Status</Label>
                                            <p className="text-lg font-semibold">{trade.status}</p>
                                            <Label className="text-gray-400">Asset</Label>
                                            <p className="text-lg">{trade.asset}</p>
                                            <Label className="text-gray-400">Invested</Label>
                                            <p className="text-lg">{trade.amount.toLocaleString()} Naira</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-gray-400">Prediction</Label>
                                            <p className="text-lg font-semibold flex items-center">
                                                {trade.prediction === 'Up' ? <ArrowUp className="mr-2 text-green-500" /> : <ArrowDown className="mr-2 text-red-500" />}
                                                {trade.prediction}
                                            </p>
                                            <Label className="text-gray-400">Multiplier</Label>
                                            <p className="text-lg">{trade.multiplier}x</p>
                                            <Label className="text-gray-400">Current Price</Label>
                                            <p className="text-lg">{trade.currentPrice.toFixed(2)} Naira</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-gray-400">Profit/Loss</Label>
                                            <p className={`text-lg font-bold ${trade.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                {trade.profit.toLocaleString()} Naira
                                            </p>
                                            <Label className="text-gray-400">Time Remaining</Label>
                                            <p className="text-lg">{formatTime(trade.timeRemaining)}</p>
                                            <Label className="text-gray-400">Expires At</Label>
                                            <p className="text-lg">{trade.expiryTime}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Label className="text-gray-400 mb-2 block">Price Chart</Label>
                                    </div>
                                    <div className="mt-4 flex justify-end space-x-4">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="destructive">
                                                    <X className="mr-2 h-4 w-4" /> Close Trade
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Close Trade</DialogTitle>
                                                    <DialogDescription>
                                                        Are you sure you want to close this trade early? This action cannot be undone.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <Button variant="secondary">Cancel</Button>
                                                    <Button variant="destructive" onClick={() => handleCloseTrade(trade.id)}>Confirm</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <Button variant="secondary">
                                            <Eye className="mr-2 h-4 w-4" /> View Details
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-6 text-center">
                            <p className="text-xl mb-4">You have no active trades. Start trading to see your live trades here!</p>
                            <Button>Go to Trading Overview</Button>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    )
}