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
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-gray-800">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold">NexusTrader</h1>
                    <nav>
                        <Button variant="ghost" size="sm"><Home className="mr-2 h-4 w-4" /> Dashboard</Button>
                        <Button variant="ghost" size="sm"><Wallet className="mr-2 h-4 w-4" /> Wallet</Button>
                        <Button variant="ghost" size="sm"><User className="mr-2 h-4 w-4" /> Profile</Button>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <User className="h-5 w-5" />
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
                {/* Real-Time Asset Prices */}
                <div className="flex space-x-4 overflow-x-auto py-2">
                    {assets.map((asset) => (
                        <Card key={asset.symbol} className="bg-gray-800 border-gray-700">
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

                {/* Market Trends Section */}
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>{selectedAsset} Chart</CardTitle>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant={chartType === 'line' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setChartType('line')}
                            >
                                <BarChart2 className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={chartType === 'candlestick' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setChartType('candlestick')}
                            >
                                <CandlestickChart className="h-4 w-4" />
                            </Button>
                        </div>
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
                                    content={chartType === 'line' ? Chart1 : Chart2}
                                    className="h-[400px]"
                                    title={`${selectedAsset} ${chartType === 'line' ? 'Line' : 'Candlestick'} Chart`}
                                />
                            </TabsContent>
                            {/* Add other TabsContent for different time ranges */}
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Available Synthetic Indices */}
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Available Synthetic Indices</CardTitle>
                        <Input className="w-64" placeholder="Search assets..." />
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {assets.map((asset) => (
                                <Card key={asset.symbol} className="bg-gray-700 border-gray-600">
                                    <CardContent className="p-4 flex justify-between items-center">
                                        <div>
                                            <div className="font-semibold">{asset.name}</div>
                                            <div className="text-sm text-gray-400">{asset.symbol}</div>
                                        </div>
                                        <Button onClick={() => setSelectedAsset(asset.name)}>Trade Now</Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}