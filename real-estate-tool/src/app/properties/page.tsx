import { Filter, Plus, Search } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { PropertyCard } from "~/components/property-card"

export default function PropertiesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Properties</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search properties..." className="w-full bg-background pl-8" />
          </div>
        </div>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Properties</TabsTrigger>
            <TabsTrigger value="sale">For Sale</TabsTrigger>
            <TabsTrigger value="rent">For Rent</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="sold">Sold</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <PropertyCard
                title="123 Main Street"
                description="3 bed, 2 bath - $450,000"
                status="For Sale"
                image="/placeholder.svg?height=100&width=200"
              />
              <PropertyCard
                title="456 Oak Avenue"
                description="4 bed, 3 bath - $625,000"
                status="For Sale"
                image="/placeholder.svg?height=100&width=200"
              />
              <PropertyCard
                title="789 Pine Lane"
                description="2 bed, 2 bath - $1,800/mo"
                status="For Rent"
                image="/placeholder.svg?height=100&width=200"
              />
              <PropertyCard
                title="101 Cedar Court"
                description="5 bed, 4 bath - $875,000"
                status="For Sale"
                image="/placeholder.svg?height=100&width=200"
              />
              <PropertyCard
                title="202 Maple Drive"
                description="3 bed, 2.5 bath - $2,200/mo"
                status="For Rent"
                image="/placeholder.svg?height=100&width=200"
              />
              <PropertyCard
                title="303 Birch Boulevard"
                description="4 bed, 3 bath - $550,000"
                status="Pending"
                image="/placeholder.svg?height=100&width=200"
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

