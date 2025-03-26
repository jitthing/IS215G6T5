import { Badge } from "~/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"

const properties = [
  {
    id: "1",
    address: "123 Main Street",
    details: "3 bed, 2 bath - $450,000",
    status: "For Sale",
    avatar: "P1",
  },
  {
    id: "2",
    address: "456 Oak Avenue",
    details: "4 bed, 3 bath - $625,000",
    status: "For Sale",
    avatar: "P2",
  },
  {
    id: "3",
    address: "789 Pine Lane",
    details: "2 bed, 2 bath - $1,800/mo",
    status: "For Rent",
    avatar: "P3",
  },
  {
    id: "4",
    address: "101 Cedar Court",
    details: "5 bed, 4 bath - $875,000",
    status: "For Sale",
    avatar: "P4",
  },
]

export function RecentProperties() {
  return (
    <div className="space-y-4">
      {properties.map((property) => (
        <div key={property.id} className="flex items-center">
          <div className="flex items-center gap-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Property" />
              <AvatarFallback>{property.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{property.address}</p>
              <p className="text-sm text-muted-foreground">{property.details}</p>
            </div>
          </div>
          <div className="ml-auto">
            <Badge variant={property.status === "For Rent" ? "secondary" : "default"}>{property.status}</Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

