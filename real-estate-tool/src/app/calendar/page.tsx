"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { CalendarView } from "~/components/calendar-view"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "~/components/ui/button"
import { UpcomingAppointments } from "~/components/upcoming-appointments"
import { SpecialOccasions } from "~/components/special-occasions"

export default function CalendarPage() {
  const [view, setView] = useState("month");

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Calendar</h1>
          <div className="flex items-center gap-2">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>
        <Tabs value={view} onValueChange={setView} className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button variant="outline" className="px-3">
                Today
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="viewings">Property Viewings</SelectItem>
                  <SelectItem value="meetings">Client Meetings</SelectItem>
                  <SelectItem value="listings">Property Listings</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <TabsContent value="day" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-[1fr_300px]">
              <Card>
                <CardHeader>
                  <CardTitle>Day View</CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarView className="w-full h-full" />
                </CardContent>
              </Card>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>You have 5 appointments today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UpcomingAppointments />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Special Occasions</CardTitle>
                    <CardDescription>Upcoming birthdays and holidays</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SpecialOccasions />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="week" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-[1fr_300px]">
              <Card>
                <CardHeader>
                  <CardTitle>Week View</CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarView className="w-full h-full" />
                </CardContent>
              </Card>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>You have 5 appointments today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UpcomingAppointments />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Special Occasions</CardTitle>
                    <CardDescription>Upcoming birthdays and holidays</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SpecialOccasions />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="month" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-[1fr_300px]">
              <Card>
                <CardHeader>
                  <CardTitle>Month View</CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarView className="w-full h-full" />
                </CardContent>
              </Card>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>You have 5 appointments today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UpcomingAppointments />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Special Occasions</CardTitle>
                    <CardDescription>Upcoming birthdays and holidays</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SpecialOccasions />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

