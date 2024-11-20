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
import { getAssets } from '@/lib/requests';


export default function OverviewScreen() {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [assets, setAssets] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([])
  const walletBalance = 10000 // Mock wallet balance


  React.useEffect(() => {
    (async function () {
      setAssets(await getAssets());
    })();
  }, [])

  const filteredAssets = assets.filter(asset =>
    (filter === 'all' || asset.type === filter) &&
    asset.name.toLowerCase().includes(searchQuery.toLowerCase() && console.log(filter))
  )

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    )
  }

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'CURRENCY_PAIR':
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
                <TabsTrigger value="CURRENCY_PAIR">Currency Pairs</TabsTrigger>
                <TabsTrigger value="COMMODITY">Commodities</TabsTrigger>
                <TabsTrigger value="STOCKS">Stocks</TabsTrigger>
                <TabsTrigger value="CRYPTOCURRENCY">Cryptocurrencies</TabsTrigger>
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
                  <Link to={"/trade/" + encodeURI(asset.symbol)}>
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
                            {getAssetIcon(asset.category)}
                            <span className="ml-1 capitalize">{asset.category.toLowerCase().split("_").join(" ")}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${asset.current_price.toFixed(2)}</p>
                        {/* <p className={`text-sm ${asset.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
                        </p> */}
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