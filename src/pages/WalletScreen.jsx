import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Search, ChevronDown, ArrowUpCircle, ArrowDownCircle, RefreshCcw, PlusCircle, MinusCircle, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// Mock data for transactions
const mockTransactions = [
    { id: 1, type: 'Deposit', amount: 5000, date: '2023-06-01T10:30:00', status: 'Completed' },
    { id: 2, type: 'Trade', amount: -1000, date: '2023-06-02T14:45:00', status: 'Completed' },
    { id: 3, type: 'Withdrawal', amount: -2000, date: '2023-06-03T09:15:00', status: 'Pending' },
    { id: 4, type: 'Trade', amount: 3000, date: '2023-06-04T16:20:00', status: 'Completed' },
    { id: 5, type: 'Deposit', amount: 10000, date: '2023-06-05T11:00:00', status: 'Completed' },
    // Add more mock transactions as needed
]

export default function WalletScreen() {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState(mockTransactions)
    const [filterType, setFilterType] = useState('All')
    const [filterDate, setFilterDate] = useState('All')
    const [sortBy, setSortBy] = useState('date')
    const [sortOrder, setSortOrder] = useState('desc')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedTransaction, setSelectedTransaction] = useState(null)

    const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0)

    const filteredTransactions = transactions
        .filter(transaction =>
            (filterType === 'All' || transaction.type === filterType) &&
            (filterDate === 'All' || isWithinDateRange(transaction.date, filterDate)) &&
            (searchQuery === '' ||
                transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                transaction.amount.toString().includes(searchQuery) ||
                transaction.status.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .sort((a, b) => {
            if (sortBy === 'date') {
                return sortOrder === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
            } else {
                return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount
            }
        })

    const isWithinDateRange = (date, range) => {
        const transactionDate = new Date(date)
        const today = new Date()
        switch (range) {
            case 'Today':
                return transactionDate.toDateString() === today.toDateString()
            case 'Last 7 Days':
                const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7))
                return transactionDate >= sevenDaysAgo
            case 'This Month':
                return transactionDate.getMonth() === today.getMonth() && transactionDate.getFullYear() === today.getFullYear()
            default:
                return true
        }
    }

    const getTransactionIcon = (type) => {
        switch (type) {
            case 'Deposit':
                return <ArrowUpCircle className="h-5 w-5 text-green-500" />
            case 'Withdrawal':
                return <ArrowDownCircle className="h-5 w-5 text-red-500" />
            case 'Trade':
                return <RefreshCcw className="h-5 w-5 text-blue-500" />
            default:
                return null
        }
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completed':
                return <Badge variant="success">Completed</Badge>
            case 'Pending':
                return <Badge variant="warning">Pending</Badge>
            case 'Failed':
                return <Badge variant="destructive">Failed</Badge>
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">

                            <Button variant="ghost" size="icon" onClick={() => { navigate(-1); }}>
                                <ArrowLeft className="h-6 w-6" />
                            </Button>

                            <h1 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">Wallet</h1>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            Balance: ₦{balance.toLocaleString()}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <Card>
                        <div className="m-6 flex justify-center space-x-4">
                            <Link to="/deposit">
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Deposit
                                </Button>
                            </Link>
                            <Link to="/withdraw">
                                <Button variant="outline">
                                    <MinusCircle className="mr-2 h-4 w-4" />
                                    Withdraw
                                </Button>
                            </Link>
                            <Link to="/overview">
                                <Button variant="secondary">
                                    <TrendingUp className="mr-2 h-4 w-4" />
                                    Start Trading
                                </Button>
                            </Link>
                        </div>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Transaction History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
                                <div className="flex space-x-2">
                                    <Select value={filterType} onValueChange={setFilterType}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Filter by type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">All Types</SelectItem>
                                            <SelectItem value="Deposit">Deposit</SelectItem>
                                            <SelectItem value="Withdrawal">Withdrawal</SelectItem>
                                            <SelectItem value="Trade">Trade</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select value={filterDate} onValueChange={setFilterDate}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Filter by date" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">All Time</SelectItem>
                                            <SelectItem value="Today">Today</SelectItem>
                                            <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
                                            <SelectItem value="This Month">This Month</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex space-x-2">
                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Sort by" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="date">Date</SelectItem>
                                            <SelectItem value="amount">Amount</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button variant="outline" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                                        {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                                    </Button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <Input
                                    type="text"
                                    placeholder="Search transactions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                            {filteredTransactions.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredTransactions.map((transaction) => (
                                            <TableRow key={transaction.id}>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        {getTransactionIcon(transaction.type)}
                                                        <span className="ml-2">{transaction.type}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className={transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                                                    ₦{transaction.amount.toLocaleString()}
                                                </TableCell>
                                                <TableCell>{new Date(transaction.date).toLocaleString()}</TableCell>
                                                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                                                <TableCell>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="outline" size="sm" onClick={() => setSelectedTransaction(transaction)}>
                                                                View Details
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Transaction Details</DialogTitle>
                                                            </DialogHeader>
                                                            {selectedTransaction && (
                                                                <div className="space-y-2">
                                                                    <p><strong>Type:</strong> {selectedTransaction.type}</p>
                                                                    <p><strong>Amount:</strong> ₦{selectedTransaction.amount.toLocaleString()}</p>
                                                                    <p><strong>Date:</strong> {new Date(selectedTransaction.date).toLocaleString()}</p>
                                                                    <p><strong>Status:</strong> {selectedTransaction.status}</p>
                                                                    <p><strong>Transaction ID:</strong> {selectedTransaction.id}</p>
                                                                </div>
                                                            )}
                                                        </DialogContent>
                                                    </Dialog>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-gray-500 dark:text-gray-400">No transactions to display.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}