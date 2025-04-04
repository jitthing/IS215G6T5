"use client";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"
import { useState } from "react";

const appointments = [
  {
    id: "1",
    time: "Today, 10:00 AM",
    type: "Viewing",
    location: "123 Main St",
    person: "John Smith",
    avatar: "JS",
  },
  {
    id: "2",
    time: "Today, 1:30 PM",
    type: "Meeting",
    location: "Office",
    person: "Sarah Johnson",
    avatar: "SJ",
  },
  {
    id: "3",
    time: "Today, 3:00 PM",
    type: "Listing",
    location: "456 Oak Ave",
    duration: "1 hour",
  },
]

export function UpcomingAppointments() {
  const [collapsed, setCollapsed] = useState(true);
  const visibleAppointments = collapsed ? appointments.slice(0, 2) : appointments;

  return (
    <div className="space-y-4">
      {visibleAppointments.map((appointment) => (
        <div key={appointment.id} className="flex flex-col gap-2 rounded-lg border p-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{appointment.time}</span>
            <Badge className="ml-auto">{appointment.type}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{appointment.location}</span>
          </div>
          {appointment.person ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Avatar" />
                <AvatarFallback>{appointment.avatar}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{appointment.person}</span>
            </div>
          ) : appointment.duration ? (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{appointment.duration}</span>
            </div>
          ) : null}
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

