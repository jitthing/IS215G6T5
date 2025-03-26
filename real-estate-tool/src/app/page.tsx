import Link from "next/link"
import { ArrowRight, Building, Calendar, ChevronRight, Home, LineChart, Users } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Overview } from "~/components/overview"
import { RecentProperties } from "~/components/recent-properties"
import { RecentLeads } from "~/components/recent-leads"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button size="sm">
              <Building className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">+12 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">+4 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+8 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Properties</CardTitle>
              <CardDescription>You have added 12 properties this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentProperties />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/properties">
                  View All Properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>You have 24 new leads this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentLeads />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/clients">
                  View All Leads
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>You have 5 tasks scheduled for today.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">10:00 AM</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Property Viewing</p>
                    <p className="text-xs text-muted-foreground">123 Main St with John Smith</p>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">1:30 PM</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Client Meeting</p>
                    <p className="text-xs text-muted-foreground">Sarah Johnson - Buyer Consultation</p>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">3:00 PM</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Property Listing</p>
                    <p className="text-xs text-muted-foreground">Take photos at 456 Oak Ave</p>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/calendar">
                  View Calendar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

