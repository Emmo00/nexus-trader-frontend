import * as React from 'react';
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold">404</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-2xl font-semibold">Page Not Found</p>
                    <p className="text-gray-500 dark:text-gray-400">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <Button asChild className="w-full">
                        <Link to="/">
                            <Home className="mr-2 h-4 w-4" />
                            Go to Homepage
                        </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                        <Link to="javascript:history.back()">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}