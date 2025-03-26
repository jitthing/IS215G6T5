"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 12,
  },
  {
    name: "Feb",
    total: 16,
  },
  {
    name: "Mar",
    total: 18,
  },
  {
    name: "Apr",
    total: 14,
  },
  {
    name: "May",
    total: 22,
  },
  {
    name: "Jun",
    total: 26,
  },
  {
    name: "Jul",
    total: 18,
  },
  {
    name: "Aug",
    total: 21,
  },
  {
    name: "Sep",
    total: 24,
  },
  {
    name: "Oct",
    total: 28,
  },
  {
    name: "Nov",
    total: 16,
  },
  {
    name: "Dec",
    total: 20,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey="total" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

