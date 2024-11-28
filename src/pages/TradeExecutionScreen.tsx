
import * as React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
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
    DialogClose,
} from "@/components/ui/dialog"
import NavigationHeader from '../components/layout/NavigationHeader'
import TradingViewChart from '@/components/chart/TradingViewChart';
import LoadingScreen from '@/components/loader/Loading';
import api from '@/lib/api';
import { transpileModule } from 'typescript';

export default function TradeExecutionScreen(props) {
    const [tradeAmount, setTradeAmount] = useState('')
    const [tradeDuration, setTradeDuration] = useState('')
    const [multiplier, setMultiplier] = useState('')
    const [prediction, _setPrediction] = useState('')
    const [timeLeft, setTimeLeft] = useState(-1) // 5 minutes in seconds
    const [isTradeValid, setIsTradeValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const [tradeID, setTradeID] = useState('');
    const [walletBalance, setWalletBalance] = useState(0);

    const { symbol } = useParams();

    function setPrediction(value) {
        _setPrediction(value);

        // get asset price
    }

    (async function startUp() {
        // get wallet balance
        api.get('/wallet/balance').then((response) => {
            setWalletBalance(response.data.data.balance);
        })
    })();

    async function confirmTrade() {
        if (!tradeAmount || !prediction || !tradeDuration) {
            toast("Please fill all fields.", {

            });
            return;
        }

        api.post('/trades', {
            symbol,
            amount: tradeAmount,
            direction: prediction,
            expiration_time: tradeDuration,
        }).then((response) => {
            toast(response.data.message);
            setTradeAmount('');
            setPrediction('');
            setTradeDuration('');

            setTimeLeft(Number(tradeDuration));
            setTradeID(response.data.data.id);
            setShowTimer(true);
        }).catch((error) => { console.log(error); toast(`Couldn't place trade: ${error.response.data.message}`) });
    }

    async function getTradeResult() {
        api.get(`/trades/${tradeID}`).then((response) => {
            setWalletBalance(response.data.data.wallet.balance)
            const outcome = response.data.data.trade.result;

            toast(`${outcome} trade`);
        }).catch(() => toast("An error occurred"));
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if (timeLeft == 0) {
            setShowTimer(false);
            getTradeResult();
        }
    }, [timeLeft]);

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
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <NavigationHeader />

            <main className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Real-Time Chart */}
                    <Card className="bg-gray-200 lg:col-span-2">
                        <CardHeader className='pb-0 mb-0'>
                            <CardTitle>Real-Time Market Data</CardTitle>
                        </CardHeader>
                        <CardContent className='w-full h-full p-4'>
                            <TradingViewChart />
                        </CardContent>
                    </Card>
                    {/* Trade Execution Form */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <div className='flex justify-between'>
                                <CardTitle>Place Your Trade</CardTitle>
                                <div><p className='text-sm font-bold'>N{walletBalance}</p></div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="tradeAmount">Trade Amount (Naira)</Label>
                                <Input
                                    id="tradeAmount"
                                    type="number"
                                    placeholder="Enter amount"
                                    value={tradeAmount}
                                    className=""
                                    onChange={(e) => setTradeAmount(e.target.value)}
                                />
                                <p className="text-xs text-gray-600 mt-1">Min: 1,000 Naira | Max: 1,000,000 Naira</p>
                            </div>

                            <div>
                                <Label htmlFor="tradeAmount">Trade Duration (seconds)</Label>
                                <Input
                                    id="tradeDuration"
                                    type="number"
                                    placeholder="Enter duration"
                                    value={tradeDuration}
                                    className=""
                                    onChange={(e) => setTradeDuration(e.target.value)}
                                />
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
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant={prediction === 'up' ? 'default' : 'outline'}
                                                className="w-full bg-green-700"
                                                onClick={() => setPrediction('up')}
                                            >
                                                <ArrowUp className="mr-2 h-4 w-4" /> Up
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Confirm Your Trade</DialogTitle>
                                                <DialogDescription>
                                                    Please review your trade details before confirming.
                                                </DialogDescription>
                                            </DialogHeader>
                                            {isLoading ? <LoadingScreen /> : (
                                                <>
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
                                                        <DialogClose asChild>
                                                            <Button type="submit" onClick={confirmTrade}>Confirm Trade</Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </>
                                            )}
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant={prediction === 'down' ? 'default' : 'outline'}
                                                className="w-full bg-red-700"
                                                onClick={() => setPrediction('down')}
                                            >
                                                <ArrowDown className="mr-2 h-4 w-4" /> Down
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Confirm Your Trade</DialogTitle>
                                                <DialogDescription>
                                                    Please review your trade details before confirming.
                                                </DialogDescription>
                                            </DialogHeader>
                                            {isLoading ? <LoadingScreen /> : (
                                                <>
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
                                                        <DialogClose asChild>
                                                            <Button type="submit" onClick={confirmTrade}>Confirm Trade</Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </>
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>

                            {showTimer ? <div className="text-center">
                                <p className="text-lg font-semibold">Time to Expiry</p>
                                <p className="text-3xl font-bold" style={{ color: getTimerColor() }}>
                                    {formatTime(timeLeft)}
                                </p>
                            </div> : <></>}
                        </CardContent>
                    </Card>
                </div>
            </main>
            <ToastContainer />
        </div>
    )
}