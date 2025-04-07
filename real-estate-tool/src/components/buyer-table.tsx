"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { MoreHorizontal, ChevronDown, ChevronUp } from "lucide-react"
import { set } from "date-fns"

interface Buyer {
    id: string,
    name: string,
    contact: string,
    preferences: string,
}

interface Property {
    seller_id: number,
    id: number,
    remaining_lease_years: number,
    remaining_lease_months: number,
    floor_category: string,
    block: string,
    description: string,
    floor_area_sqm: number,
    property_type: string,
    flat_type: string,
    town: string,
    street_name: string,
    asking_price: number,
    match_score?: number, // Add match_score as optional property
}

const MATCHING_SERVICE = process.env.NEXT_PUBLIC_MATCHING_SERVICE

export function BuyerTable({ filter = null }) {
//   const [buyers, setBuyers] = useState<Buyer[]>(dummyBuyers);
  const [expandedBuyer, setExpandedBuyer] = useState<string | null>(null);
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer>();
  const [matchedProperties, setMatchedProperties] = useState<Property[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [buyers, setBuyers] = useState<Buyer[]>([]);

  const handleViewMatches = (buyer: Buyer) => {
    const fetchMatches = async () => {
        const properties = await fetch(`${MATCHING_SERVICE}/buyers/${buyer.id}/suggested-properties`);
        if (!properties.ok) {
            throw new Error("Failed to fetch properties");
        }
        const data = await properties.json();
        setSelectedBuyer(buyer);
        setMatchedProperties(data.suggested_properties);
        setDialogOpen(true);
    }
    fetchMatches();
  };

  const toggleExpand = (buyerId: any) => {
    setExpandedBuyer(expandedBuyer === buyerId ? null : buyerId);
  };

  useEffect(() => {
    const fetchBuyers = async () => {
      const buyers = await fetch(`${MATCHING_SERVICE}/buyers/1`);
      if (!buyers.ok) {
        throw new Error("Failed to fetch buyers");
      }
      const data = await buyers.json();
      setBuyers(data);
    }
    if (buyers.length === 0) {
      fetchBuyers();
    }
  }, []);
  

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Preferences</TableHead>
              {/* <TableHead>Status</TableHead>
              <TableHead>Since</TableHead> */}
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buyers.map((buyer) => (
                <>
                <TableRow key={buyer.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-0 h-6 w-6" 
                        onClick={() => toggleExpand(buyer.id)}
                      >
                        {expandedBuyer === buyer.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </Button>
                      {buyer.name}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {buyer.preferences}
                  </TableCell>
                  {/* <TableCell>
                    <Badge variant={buyer.status === "Active" ? "default" : "secondary"}>
                      {buyer.status}
                    </Badge>
                  </TableCell> */}
                  {/* <TableCell>{buyer.createdAt}</TableCell> */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleViewMatches(buyer)}>View Matched Properties</DropdownMenuItem>
                        <DropdownMenuItem>Edit Buyer</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete Buyer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                {expandedBuyer === buyer.id && (
                  <TableRow>
                    <TableCell colSpan={5} className="p-0">
                      <div className="bg-muted/50 p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Contact</p>
                            <p className="text-sm">{buyer.contact}</p>
                          </div>
                          {/* <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm">{buyer.email}</p>
                          </div> */}
                          <div className="col-span-2">
                            <p className="text-sm font-medium">Full Preferences</p>
                            <p className="text-sm">{buyer.preferences}</p>
                          </div>
                          <div className="col-span-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewMatches(buyer)}
                            >
                              View Matched Properties
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Matched Properties for {selectedBuyer?.name}</DialogTitle>
            <DialogDescription>
              Based on buyer's preferences: {selectedBuyer?.preferences}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {matchedProperties.length > 0 ? (
              matchedProperties.map(property => (
                <Card key={property.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>{property.block} {property.street_name}</CardTitle>
                      {property.match_score && (
                        <Badge className={`${
                          property.match_score >= 50 ? 'bg-green-600' : 
                          property.match_score >= 40 ? 'bg-yellow-500' : 
                          'bg-orange-500'
                        }`}>
                          {property.match_score}% Match
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{property.town} | {property.flat_type} | {property.property_type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium">Price</p>
                        <p className="text-lg font-bold">${property.asking_price.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Area</p>
                        <p>{property.floor_area_sqm} sqm</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Lease</p>
                        <p>{property.remaining_lease_years}y {property.remaining_lease_months}m</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">View Property Details</Button>
                      <Button size="sm">Contact Seller</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p>No matching properties found</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
