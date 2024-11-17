import React, { useState } from 'react'
import { Bell, ChevronDown, Home, Wallet, BarChart2, ArrowUp, ArrowDown, RefreshCw, PlusCircle, MinusCircle, TrendingUp, HelpCircle, LogOut, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link } from 'react-router-dom';

export default function () {

    const [notifications, setNotifications] = useState(3)

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
                            NexusTrader
                        </Link>
                    </div>
                    <nav className="hidden md:flex space-x-10">
                        <Link to="/overview">
                            <Button variant="ghost">
                                <BarChart2 className="mr-2 h-4 w-4" /> Trade Overview
                            </Button>
                        </Link>
                    </nav>
                    <div className="flex items-center justify-end md:flex-1 lg:w-0">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="relative">
                                        <Bell className="h-5 w-5" />
                                        {notifications > 0 && (
                                            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full">
                                                {notifications}
                                            </Badge>
                                        )}
                                        <span className="sr-only">Notifications</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>You have {notifications} unread notifications</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="ml-4 flex items-center space-x-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <span>John Doe</span>
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link to="/dashboard">
                                    <DropdownMenuItem><Home className="mr-2 h-4 w-4" /> Dashboard</DropdownMenuItem>
                                </Link>
                                <Link to="/wallet">
                                    <DropdownMenuItem><Wallet className="mr-2 h-4 w-4" /> Wallet</DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem>
                                    <Settings /> Settings</DropdownMenuItem>
                                <DropdownMenuItem><LogOut /> Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
}