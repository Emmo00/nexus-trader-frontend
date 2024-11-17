import React, { useState, useEffect } from 'react'
import { ArrowLeft, Bell, ChevronDown, Home, Wallet, BarChart2, ArrowUp, ArrowDown, AlertTriangle } from 'lucide-react'
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

import Chart1 from "@/data-chart/line"
import { ChartWrapper } from "@/data-chart/wrapper"

export default function TradeConfirmationScreen() {
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes in seconds
  const [isConfirmed, setIsConfirmed] = useState(false)

  // Mock trade data (in a real app, this would be passed as props or fetched from a state management system)
  const tradeData = {
    type: 'Up',
    amount: 5000,
    multiplier: 50,
    potentialProfit: 250000,
    asset: 'Volatility 75 Index',
    marketPrice: 1234.56,
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlaceTrade = () => {
    setIsConfirmed(true)
    // Here you would typically send the trade data to your backend
    console.log('Trade placed:', tradeData)
    // Redirect to trade overview or confirmation page
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
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl">Confirm Your Trade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Trade Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-400">Trade Type</Label>
                <p className="text-2xl font-bold flex items-center">
                  {tradeData.type === 'Up' ? <ArrowUp className="mr-2 text-green-500" /> : <ArrowDown className="mr-2 text-red-500" />}
                  {tradeData.type}
                </p>
              </div>
              <div>
                <Label className="text-gray-400">Trade Amount</Label>
                <p className="text-2xl font-bold">{tradeData.amount.toLocaleString()} Naira</p>
              </div>
              <div>
                <Label className="text-gray-400">Multiplier</Label>
                <p className="text-2xl font-bold">{tradeData.multiplier}x</p>
              </div>
              <div>
                <Label className="text-gray-400">Potential Profit</Label>
                <p className="text-2xl font-bold text-green-500">{tradeData.potentialProfit.toLocaleString()} Naira</p>
              </div>
              <div>
                <Label className="text-gray-400">Asset</Label>
                <p className="text-xl">{tradeData.asset}</p>
              </div>
              <div>
                <Label className="text-gray-400">Market Price</Label>
                <p className="text-xl">{tradeData.marketPrice.toFixed(2)}</p>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="text-center">
              <Label className="text-gray-400">Time to Expiry</Label>
              <p className="text-3xl font-bold">{formatTime(timeLeft)}</p>
              <p className="text-sm text-gray-400">Trade Expiry: 2 minutes</p>
            </div>

            {/* Risk Warning */}
            <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4 flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-1" />
              <p className="text-sm">
                By confirming, you are agreeing to place a trade with the selected amount and multiplier. 
                Remember, if the trade is unsuccessful, only your profit will be lost, but your capital remains intact.
              </p>
            </div>

            {/* Real-Time Chart Snapshot */}
            <div>
              <Label className="text-gray-400 mb-2 block">Current Market Trend</Label>
              <ChartWrapper
                content={Chart1}
                className="h-[200px]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                className="flex-1"
                variant="secondary"
                onClick={() => console.log('Navigating back to Trade Execution Screen')}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handlePlaceTrade}
                disabled={isConfirmed}
              >
                {isConfirmed ? 'Trade Placed' : 'Place Trade'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}