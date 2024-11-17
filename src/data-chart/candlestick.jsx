import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
    { name: 'Jan', open: 4000, high: 4500, low: 3500, close: 4200 },
    { name: 'Feb', open: 4200, high: 4800, low: 4000, close: 4500 },
    { name: 'Mar', open: 4500, high: 5000, low: 4300, close: 4800 },
    { name: 'Apr', open: 4800, high: 5200, low: 4600, close: 5000 },
    { name: 'May', open: 5000, high: 5500, low: 4800, close: 5200 },
]

const Chart2 = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="low" fill="#8884d8" />
                <Bar dataKey="open" fill="#82ca9d" />
                <Bar dataKey="close" fill="#ffc658" />
                <Bar dataKey="high" fill="#ff7300" />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default Chart2