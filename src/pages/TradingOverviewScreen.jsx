"use client"

import React, { useState } from 'react'
import { Bell, ChevronDown, Search, Wallet, User, Home, BarChart2, CandlestickChart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Chart1 from "@/data-chart/line"
import Chart2 from "@/data-chart/candlestick"
import { ChartWrapper } from "@/data-chart/wrapper"
import NavigationHeader from '../components/layout/NavigationHeader'

export default function TradingOverviewScreen() {
    const [selectedAsset, setSelectedAsset] = useState('Volatility 75 Index')
    const [chartType, setChartType] = useState('line')

    const assets = [
        { name: 'Volatility 75 Index', symbol: 'VOL75', price: 1234.56, change: 2.5 },
        { name: 'Step Index', symbol: 'STEP', price: 987.65, change: -1.2 },
        { name: 'Boom 500 Index', symbol: 'BOOM500', price: 5678.90, change: 0.8 },
        { name: 'Crash 1000 Index', symbol: 'CRASH1000', price: 4321.09, change: -3.7 },
    ]

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <NavigationHeader />

            <main className="p-6 space-y-6">
                {/* Real-Time Asset Prices */}
                <div className="flex space-x-4 overflow-x-auto py-2">
                    {assets.map((asset) => (
                        <Card key={asset.symbol} className="bg-gray-200 border-gray-300">
                            <CardContent className="p-4">
                                <div className="font-semibold">{asset.name}</div>
                                <div className={`text-xl font-bold ${asset.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    ${asset.price.toFixed(2)}
                                </div>
                                <div className={`text-sm ${asset.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {asset.change >= 0 ? '+' : ''}{asset.change}%
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </main>
        </div>
    )
}