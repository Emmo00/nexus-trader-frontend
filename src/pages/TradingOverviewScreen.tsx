"use client"

import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Wallet, ArrowUpCircle, ArrowDownCircle, DollarSign, Bitcoin, BarChart2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import NavigationHeader from '@/components/layout/NavigationHeader'

// Mock data for assets
const assets = [
  { id: 1, name: 'EUR/USD', type: 'currency', price: 1.1234, change: 0.05 },
  { id: 2, name: 'GBP/JPY', type: 'currency', price: 156.78, change: -0.12 },
  { id: 3, name: 'Gold', type: 'commodity', price: 1800.50, change: 0.75 },
  { id: 4, name: 'Oil', type: 'commodity', price: 75.30, change: -1.20 },
  { id: 5, name: 'Apple', type: 'stock', price: 150.25, change: 1.50 },
  { id: 6, name: 'Tesla', type: 'stock', price: 700.00, change: -2.30 },
  { id: 7, name: 'Bitcoin', type: 'crypto', price: 35000.00, change: 3.75 },
  { id: 8, name: 'Ethereum', type: 'crypto', price: 2500.00, change: 2.10 },
]

export default function OverviewScreen() {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
  const walletBalance = 10000 // Mock wallet balance

  const filteredAssets = assets.filter(asset =>
    (filter === 'all' || asset.type === filter) &&
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    )
  }

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'currency':
        return <DollarSign className="h-4 w-4" />
      case 'commodity':
        return <BarChart2 className="h-4 w-4" />
      case 'stock':
        return <ArrowUpCircle className="h-4 w-4" />
      case 'crypto':
        return <Bitcoin className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavigationHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Section: Wallet Balance and Quick Actions */}
        <Card className="mb-6">
          <CardContent className="flex justify-between items-center p-6">
            <div>
              <CardTitle className="text-2xl font-bold mb-2">Wallet Balance</CardTitle>
              <p className="text-3xl font-bold">${walletBalance.toLocaleString()}</p>
            </div>
            <div>
              <Link to="/deposit">
                <Button className='w-full mb-2'>
                  <ArrowUpCircle className="mr-2 h-4 w-4" />
                  Deposit
                </Button>
              </Link>
              <Link to="/withdraw" >
                <Button variant="outline" className='w-full'>
                  <ArrowDownCircle className="mr-2 h-4 w-4" />
                  Withdraw
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Middle Section: Filter Options and Search */}
        <div className="mb-6">
          <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="currency">Currency Pairs</TabsTrigger>
                <TabsTrigger value="commodity">Commodities</TabsTrigger>
                <TabsTrigger value="stock">Stocks</TabsTrigger>
                <TabsTrigger value="crypto">Cryptocurrencies</TabsTrigger>
              </TabsList>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search assets..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </Tabs>
        </div>

        {/* Main Section: Asset List */}
        <Card>
          <CardHeader>
            <CardTitle>Trading Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] w-full">
              <div className="space-y-4">
                {filteredAssets.map((asset) => (
                  <Link to={"/trade?asset=" + encodeURI(asset.name)}>
                    <div key={asset.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(asset.id)}
                          className={favorites.includes(asset.id) ? 'text-yellow-400' : 'text-gray-400'}
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                        <div className="ml-4">
                          <p className="font-semibold">{asset.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            {getAssetIcon(asset.type)}
                            <span className="ml-1 capitalize">{asset.type}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${asset.price.toFixed(2)}</p>
                        <p className={`text-sm ${asset.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}