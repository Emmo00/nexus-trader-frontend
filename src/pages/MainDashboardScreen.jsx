import { Bell, ChevronDown, Home, Wallet, BarChart2, ArrowUp, ArrowDown, RefreshCw, PlusCircle, MinusCircle, TrendingUp, HelpCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ChartWrapper } from "@/data-chart/wrapper"
import Chart1 from "@/data-chart/line"
import NavigationHeader from '@/components/layout/NavigationHeader'

export default function MainDashboard() {
    // Mock data
    const walletData = {
        balance: 50000,
        available: 30000,
        locked: 20000,
        totalProfit: 25000
    }

    const activeTrades = {
        count: 3,
        invested: 15000,
        profit: 5000,
        timeRemaining: 90 // in seconds
    }

    const recentTrades = [
        { id: 1, asset: 'S&P 500 Synthetic', amount: 10000, prediction: 'Up', outcome: 5000 },
        { id: 2, asset: 'Volatility 75 Index', amount: 5000, prediction: 'Down', outcome: -2000 },
    ]

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Header */}
            <NavigationHeader />

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Wallet Overview */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Wallet Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Balance</span>
                                        <span className="text-lg font-semibold">{formatCurrency(walletData.balance)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Available</span>
                                        <span className="text-green-600 dark:text-green-400">{formatCurrency(walletData.available)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Locked for Trades</span>
                                        <span className="text-yellow-600 dark:text-yellow-400">{formatCurrency(walletData.locked)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Profit</span>
                                        <span className="text-green-600 dark:text-green-400">{formatCurrency(walletData.totalProfit)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button className="w-full"><PlusCircle className="mr-2 h-4 w-4" /> Deposit Funds</Button>
                                <Button className="w-full" variant="outline"><MinusCircle className="mr-2 h-4 w-4" /> Withdraw Funds</Button>
                                <Button className="w-full" variant="secondary"><TrendingUp className="mr-2 h-4 w-4" /> Start Trading</Button>
                            </CardContent>
                        </Card>

                        {/* Active Trades Overview */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Active Trades</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Active Trades</span>
                                        <span className="text-lg font-semibold">{activeTrades.count}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Invested</span>
                                        <span>{formatCurrency(activeTrades.invested)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Profit</span>
                                        <span className="text-green-600 dark:text-green-400">{formatCurrency(activeTrades.profit)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Trade Expiry</span>
                                        <span>{formatTime(activeTrades.timeRemaining)}</span>
                                    </div>
                                    <Progress value={(activeTrades.timeRemaining / 120) * 100} className="mt-2" />
                                    <Button className="w-full mt-4" variant="outline">View Live Trades</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Trade History Overview */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Recent Trades</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentTrades.map((trade) => (
                                        <div key={trade.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <div>
                                                <p className="font-semibold">{trade.asset}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Invested: {formatCurrency(trade.amount)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold">
                                                    {trade.prediction === 'Up' ? <ArrowUp className="inline mr-1 text-green-500" /> : <ArrowDown className="inline mr-1 text-red-500" />}
                                                    {trade.prediction}
                                                </p>
                                                <p className={`text-sm ${trade.outcome >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                    Outcome: {formatCurrency(trade.outcome)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    <Button className="w-full" variant="outline">View Trade History</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Performance Insights */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Performance Insights</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartWrapper
                                    content={Chart1}
                                    className="h-[200px]"
                                    title="Weekly Profit/Loss Trend"
                                />
                                <div className="mt-4 flex justify-between">
                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Success Rate</span>
                                    <span className="text-lg font-semibold">80%</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* User Guidance and Tips */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Trading Tips</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Always set a stop-loss to limit potential losses. This helps manage risk and protect your capital.
                            </p>
                            <div className="mt-4 flex justify-between items-center">
                                <Button variant="link" className="p-0">
                                    <HelpCircle className="mr-2 h-4 w-4" />
                                    Need help? Visit our FAQ
                                </Button>
                                <Button variant="outline" size="sm">Next Tip</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}