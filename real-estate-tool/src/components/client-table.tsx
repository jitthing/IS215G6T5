"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Edit, MoreHorizontal, Trash, Home, User, Plus } from "lucide-react";
import { AddPropertyForm } from "./add-property-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { set } from "date-fns";

// Types to match our backend
interface Property {
  id: number;
  seller_id: number;
  property_type: string;
  floor_area_sqm: number;
  remaining_lease_years: number;
  remaining_lease_months: number;
  flat_type: string;
  floor_category: string;
  town: string;
  block: string;
  street_name: string;
  description: string;
  asking_price: number;
}

interface Buyer {
  id: number;
  name: string;
  contact: string;
  preferences: string;
}

const clients = [
  {
    id: "3",
    name: "Robert Davis",
    email: "robert.d@example.com",
    phone: "+65 94567890",
    status: "Seller",
    lastContact: "3 days ago",
    avatar: "RD",
  },
  {
    id: "7",
    name: "James Lee",
    email: "james.lee@example.com",
    phone: "+65 95678901",
    status: "Seller",
    lastContact: "5 days ago",
    avatar: "JL",
  },
  {
    id: "8",
    name: "Sophia Tan",
    email: "sophia.t@example.com",
    phone: "+65 96789012",
    status: "Seller",
    lastContact: "Yesterday",
    avatar: "ST",
  },
];

interface Seller{
  id: number,
  name: string,
  contact: string
}

export function ClientTable() {
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [matchingBuyers, setMatchingBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("properties");
  const [addPropertyModalOpen, setAddPropertyModalOpen] = useState(false);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [isSellers, setIsSellers] = useState(false);

  // Backend API URL
  const MATCHING_SERVICE = process.env.NEXT_PUBLIC_MATCHING_SERVICE;

  // Fetch properties when a seller is selected
  useEffect(() => {
    if (selectedSeller) {
      fetchProperties(selectedSeller);
    }
  }, [selectedSeller]);

  useEffect(() => {
    const fetchSellers = async () => {
      const sellers = await fetch(`${MATCHING_SERVICE}/sellers/1`);
      if (!sellers.ok) {
        throw new Error("Failed to fetch sellers");
      }
      const data = await sellers.json();
      setSellers(data);
    }
    if (sellers.length === 0) {
      fetchSellers();
    }
  }, []); // Fixed syntax: moved closing parenthesis before the dependency array

  // Fetch properties for a seller
  const fetchProperties = async (sellerId: string) => {
    setLoading(true);
    try {
      // Use actual API call instead of hardcoded mock data
      const response = await fetch(`${MATCHING_SERVICE}/sellers/${sellerId}/properties`);
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);

      // Fallback to mock data if API fails
      const mockProperties = [
        {
          id: 1,
          seller_id: 3,
          property_type: "HDB",
          floor_area_sqm: 95,
          remaining_lease_years: 55,
          remaining_lease_months: 4,
          flat_type: "4 ROOM",
          floor_category: "medium",
          town: "BISHAN",
          block: "123",
          street_name: "BISHAN STREET 13",
          description: "Well-maintained 4-room flat near Bishan MRT, good ventilation, recently renovated kitchen",
          asking_price: 420000,
        },
        {
          id: 2,
          seller_id: 7,
          property_type: "HDB",
          floor_area_sqm: 67,
          remaining_lease_years: 60,
          remaining_lease_months: 7,
          flat_type: "3 ROOM",
          floor_category: "low",
          town: "ANG MO KIO",
          block: "108",
          street_name: "ANG MO KIO AVE 4",
          description: "Cozy 3-room flat in Ang Mo Kio, walking distance to amenities, well-maintained",
          asking_price: 280000,
        },
        {
          id: 3,
          seller_id: 8,
          property_type: "HDB",
          floor_area_sqm: 110,
          remaining_lease_years: 72,
          remaining_lease_months: 2,
          flat_type: "EXECUTIVE",
          floor_category: "high",
          town: "TAMPINES",
          block: "456",
          street_name: "TAMPINES STREET 42",
          description: "Spacious executive flat in Tampines with excellent view, near shopping mall and MRT",
          asking_price: 580000,
        },
      ];

      // Filter properties for the selected seller
      const filteredProperties = mockProperties.filter((p) => p.seller_id.toString() === sellerId);

      setProperties(filteredProperties);
    } finally {
      setLoading(false);
    }
  };

  // Fetch matching buyers for a property
  const fetchMatchingBuyers = async (propertyId: number) => {
    setLoading(true);
    try {
      // Use actual API call
      const response = await fetch(`${MATCHING_SERVICE}/properties/${propertyId}/matching-buyers`);
      if (!response.ok) {
        throw new Error("Failed to fetch matching buyers");
      }
      const data = await response.json();
      setMatchingBuyers(data.matching_buyers);

      // Ensure we set the active tab after the data is loaded
      setActiveTab("buyers");
    } catch (error) {
      console.error("Error fetching matching buyers:", error);

      // Fallback mock data matching the backend format
      const mockMatchingBuyers = {
        property_id: 1,
        matching_buyers: [
          {
            id: 1,
            name: "John Smith",
            contact: "+65 91234567",
            preferences: "Looking for a 3-room flat in Ang Mo Kio with good ventilation, near MRT, below 300k",
          },
          {
            id: 2,
            name: "Sarah Johnson",
            contact: "+65 99876543",
            preferences: "Interested in a 4-room flat in Bishan, high floor, good school zone, budget 450k",
          },
        ],
      };

      // Determine which buyers to show based on property
      let buyers: Buyer[] = [];
      if (propertyId === 1) {
        buyers = mockMatchingBuyers.matching_buyers.filter((b) => b.id === 2 || b.id === 1);
      } else if (propertyId === 2) {
        buyers = mockMatchingBuyers.matching_buyers.filter((b) => b.id === 1 || b.id === 2);
      } else if (propertyId === 3) {
        buyers = [
          {
            id: 4,
            name: "Emily Wilson",
            contact: "+65 97890123",
            preferences: "Looking for an executive flat in Tampines, at least 110 sqm, remaining lease > 70 years",
          },
          {
            id: 2,
            name: "Sarah Johnson",
            contact: "+65 99876543",
            preferences: "Interested in a 4-room flat in Bishan, high floor, good school zone, budget 450k",
          },
        ];
      }

      setMatchingBuyers(buyers);
      // Ensure we set the active tab even when using fallback data
      setActiveTab("buyers");
    } finally {
      setLoading(false);
    }
  };

  const handleViewProperties = (sellerId: string) => {
    setSelectedSeller(sellerId);
    setShowModal(true);
    // Reset property selection when changing seller
    setSelectedProperty(null);
    setActiveTab("properties");
  };

  const handlePropertyClick = (propertyId: number) => {
    setSelectedProperty(propertyId);
    fetchMatchingBuyers(propertyId);
  };

  // New function to handle tab switching directly
  const handleTabChange = (tab: string) => {
    if (tab === "buyers" && !selectedProperty) {
      // Don't switch to buyers tab if no property is selected
      return;
    }
    setActiveTab(tab);
  };

  const handleAddProperty = (sellerId: string) => {
    setSelectedSeller(sellerId);
    setAddPropertyModalOpen(true);
  };

  const handlePropertyAdded = () => {
    // Close the modal
    setAddPropertyModalOpen(false);

    // If we're currently viewing properties for this seller, refresh them
    if (selectedSeller && showModal) {
      fetchProperties(selectedSeller);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-SG", {
      style: "currency",
      currency: "SGD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            {/* <TableHead>Email</TableHead> */}
            <TableHead>Phone</TableHead>
            {/* <TableHead>Status</TableHead> */}
            {/* <TableHead>Last Contact</TableHead> */}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sellers.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  {client.name}
                </div>
              </TableCell>
              {/* <TableCell>{client.email}</TableCell> */}
              <TableCell>{client.contact}</TableCell>
              {/* <TableCell>
                <Badge variant={client.status === "Seller" ? "secondary" : "default"}>{client.status}</Badge>
              </TableCell>
              <TableCell>{client.lastContact}</TableCell> */}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewProperties(String(client.id))}>
                        <Home className="mr-2 h-4 w-4" />
                        View Properties
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAddProperty(String(client.id))}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Property
                      </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View client</DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Simple Modal instead of Dialog */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                Properties
                {selectedSeller && ` - ${clients.find((c) => c.id === selectedSeller)?.name}`}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                X
              </Button>
            </div>

            <div className="mb-4">
              <div className="flex border-b">
                <button
                  className={`px-4 py-2 ${
                    activeTab === "properties" ? "border-b-2 border-primary font-medium" : ""
                  }`}
                  onClick={() => handleTabChange("properties")}
                >
                  Properties
                </button>
                <button
                  className={`px-4 py-2 ${
                    activeTab === "buyers" ? "border-b-2 border-primary font-medium" : ""
                  } ${!selectedProperty ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  onClick={() => {
                    if (selectedProperty) {
                      handleTabChange("buyers");
                    }
                  }}
                  disabled={!selectedProperty}
                >
                  Matching Buyers
                  {selectedProperty ? "" : " (Select a property first)"}
                </button>
              </div>
            </div>

            {activeTab === "properties" ? (
              <>
                {loading ? (
                  <div className="flex justify-center p-4">Loading properties...</div>
                ) : properties.length > 0 ? (
                  <div className="grid gap-4">
                    {properties.map((property) => (
                      <div
                        key={property.id}
                        className={`border rounded-lg p-4 cursor-pointer ${
                          selectedProperty === property.id ? "border-primary border-2" : ""
                        }`}
                        onClick={() => handlePropertyClick(property.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">
                            {property.flat_type} in {property.town}
                          </h3>
                          <Badge>{formatCurrency(property.asking_price)}</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          {property.block} {property.street_name}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                          <div>
                            <span className="font-medium">Area:</span> {property.floor_area_sqm} sqm
                          </div>
                          <div>
                            <span className="font-medium">Floor:</span> {property.floor_category}
                          </div>
                          <div>
                            <span className="font-medium">Type:</span> {property.property_type}
                          </div>
                          <div>
                            <span className="font-medium">Lease:</span> {property.remaining_lease_years}y{" "}
                            {property.remaining_lease_months}m
                          </div>
                        </div>
                        <hr className="my-2" />
                        <p className="text-sm">{property.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4">No properties found for this seller.</div>
                )}
              </>
            ) : (
              <>
                {loading ? (
                  <div className="flex justify-center p-4">Loading matching buyers...</div>
                ) : matchingBuyers.length > 0 ? (
                  <div className="grid gap-4">
                    <h3 className="text-lg font-medium">
                      Top Matching Buyers for {properties.find((p) => p.id === selectedProperty)?.flat_type} in{" "}
                      {properties.find((p) => p.id === selectedProperty)?.town}
                    </h3>
                    {matchingBuyers.map((buyer) => (
                      <div key={buyer.id} className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {buyer.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="font-bold">{buyer.name}</h3>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{buyer.contact}</p>
                        <div className="flex items-start gap-2">
                          <User className="h-4 w-4 mt-1 text-gray-400" />
                          <p className="text-sm">{buyer.preferences}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4">No matching buyers found.</div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Add Property Dialog */}
      <Dialog open={addPropertyModalOpen} onOpenChange={setAddPropertyModalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              Add New Property
              {selectedSeller && ` for ${clients.find((c) => c.id === selectedSeller)?.name}`}
            </DialogTitle>
          </DialogHeader>
          {selectedSeller && (
            <AddPropertyForm sellerId={selectedSeller} onSuccess={handlePropertyAdded} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}



