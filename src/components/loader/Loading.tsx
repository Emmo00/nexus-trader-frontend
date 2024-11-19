import * as React from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingScreenProps {
    message?: string
}

export default function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 z-50">
            <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto" />
                <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">{message}</p>
            </div>
        </div>
    )
}