"use client"

import { Filter, Plus, Search } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { ClientTable } from "~/components/client-table"
import { AddSellerDialog } from "~/components/add-seller-dialog"
import { useState } from "react"

export default function ClientsPage() {
  const [addClientOpen, setAddClientOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">My Properties (Sellers)</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" onClick={() => setAddClientOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search clients..." className="w-full bg-background pl-8" />
          </div>
        </div>
        <Tabs defaultValue="all" className="space-y-4">
          {/* <TabsList>
            <TabsTrigger value="all">All Clients</TabsTrigger>
            <TabsTrigger value="buyers">Buyers</TabsTrigger>
            <TabsTrigger value="sellers">Sellers</TabsTrigger>
            <TabsTrigger value="leads">New Leads</TabsTrigger>
          </TabsList> */}
          <TabsContent value="all" className="space-y-4">
            <ClientTable />
          </TabsContent>
        </Tabs>
      </main>
      
      <AddSellerDialog open={addClientOpen} onOpenChange={setAddClientOpen} />
    </div>
  )
}

