"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    sales: 3,
    revenue: 120000,
  },
  {
    name: "Feb",
    sales: 4,
    revenue: 180000,
  },
  {
    name: "Mar",
    sales: 5,
    revenue: 210000,
  },
  {
    name: "Apr",
    sales: 3,
    revenue: 150000,
  },
  {
    name: "May",
    sales: 6,
    revenue: 280000,
  },
  {
    name: "Jun",
    sales: 7,
    revenue: 320000,
  },
]

export function SalesMetrics() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="sales" fill="#8884d8" name="Properties Sold" />
        <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
      </BarChart>
    </ResponsiveContainer>
  )
}

