"use client";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import { Calendar, Gift } from "lucide-react"
import { useState } from "react"

const occasions = [
  {
    id: "1",
    date: "Mar 15, 2024",
    type: "Birthday",
    person: "John Smith",
    avatar: "JS",
    details: "Client since 2020"
  },
  {
    id: "2",
    date: "Mar 20, 2024",
    type: "Holiday",
    occasion: "Spring Festival",
    details: "Celebrated by Asian clients"
  },
  {
    id: "3",
    date: "Mar 25, 2024",
    type: "Birthday",
    person: "Sarah Johnson",
    avatar: "SJ",
    details: "Client since 2022"
  }
]

export function SpecialOccasions() {
  const [collapsed, setCollapsed] = useState(true);
  const visibleOccasions = collapsed ? occasions.slice(0, 2) : occasions;

  return (
    <div className="space-y-4">
      {visibleOccasions.map((occasion) => (
        <div key={occasion.id} className="flex flex-col gap-2 rounded-lg border p-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{occasion.date}</span>
            <Badge 
              variant={occasion.type === "Holiday" ? "secondary" : "default"}
              className="ml-auto"
            >
              {occasion.type}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Gift className="h-4 w-4 text-muted-foreground" />
            {occasion.person ? (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Avatar" />
                  <AvatarFallback>{occasion.avatar}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{occasion.person}</span>
              </div>
            ) : (
              <span className="text-sm">{occasion.occasion}</span>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {occasion.details}
          </div>
        </div>
      ))}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="text-blue-500 hover:underline"
      >
        {collapsed ? "Show More" : "Show Less"}
      </button>
    </div>
  );
}