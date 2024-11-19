import * as React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api'
import LoadingScreen from '@/components/loader/Loading';

interface RequireAuthProps {
    children: React.ReactNode
}

export default function RequireAuth({ children }: RequireAuthProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get('/auth/profile')

                const userProfile = response.data;
                localStorage.setItem('userProfile', JSON.stringify(userProfile))
                localStorage.setItem('isAuthenticated', JSON.stringify(true))
                setIsAuthenticated(true)
            } catch (error) {
                console.error('Authentication error:', error)
                navigate('/login')
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [navigate])

    if (isLoading) {
        return <LoadingScreen />; // You can replace this with a proper loading component
    }

    return isAuthenticated ? <>{children}</> : null
}