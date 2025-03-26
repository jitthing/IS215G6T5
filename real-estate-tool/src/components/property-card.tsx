import Link from "next/link"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

interface PropertyCardProps {
  title: string
  description: string
  status: string
  image: string
}

export function PropertyCard({ title, description, status, image }: PropertyCardProps) {
  return (
    <Card>
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <div
            className="rounded-t-lg h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image || "/placeholder.svg"})` }}
          />
          <Badge className="absolute right-2 top-2">{status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
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
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/properties/${encodeURIComponent(title)}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

