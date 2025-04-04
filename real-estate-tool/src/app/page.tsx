import Link from "next/link";
import {
  ArrowRight,
  Building,
  Calendar,
  ChevronRight,
  Home,
  LineChart,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Overview } from "~/components/overview";
import { RecentProperties } from "~/components/recent-properties";
import { RecentLeads } from "~/components/recent-leads";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">CRM Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Week
            </Button>
            <Button variant="outline" size="sm">
              Month
            </Button>
            <Button variant="outline" size="sm">
              Year
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="h-32">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Number of Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+8 from last month</p>
            </CardContent>
          </Card>
          <Card className="h-32">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Number of Opportunities</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">+5 from last month</p>
            </CardContent>
          </Card>
          <Card className="h-32">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">62%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card className="h-32">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Time to Sell</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">45 days</div>
              <p className="text-xs text-muted-foreground">-3 days from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clients by Stages</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between space-x-4">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium">Enquiring</span>
                  <span className="text-xl font-bold">10</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium">Viewing</span>
                  <span className="text-xl font-bold">8</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium">Negotiating</span>
                  <span className="text-xl font-bold">5</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium">Closed</span>
                  <span className="text-xl font-bold">3</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview type="stacked-bar" legend={['Actual Revenue', 'Potential Revenue']} />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Card className="col-span-1">
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
          <Card className="col-span-1">
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
        </div>
      </main>
    </div>
  );
}

