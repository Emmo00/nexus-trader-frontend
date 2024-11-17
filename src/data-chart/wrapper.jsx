import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export const ChartWrapper = ({ content: ChartComponent, className, title }) => {
    return (
        <Card className={className}>
            {title && (
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
            )}
            <CardContent>
                <ChartComponent />
            </CardContent>
        </Card>
    )
}