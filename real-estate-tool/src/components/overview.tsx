"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: 12000,
  },
  {
    name: "Feb",
    total: 16000,
  },
  {
    name: "Mar",
    total: 18000,
  },
  {
    name: "Apr",
    total: 14000,
  },
  {
    name: "May",
    total: 22000,
  },
  {
    name: "Jun",
    total: 26000,
  },
  {
    name: "Jul",
    total: 18000,
  },
  {
    name: "Aug",
    total: 21000,
  },
  {
    name: "Sep",
    total: 24000,
  },
  {
    name: "Oct",
    total: 28000,
  },
  {
    name: "Nov",
    total: 16000,
  },
  {
    name: "Dec",
    total: 20000,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
