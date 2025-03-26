import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

const clients = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    status: "Buyer",
    lastContact: "2 days ago",
    avatar: "JS",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 987-6543",
    status: "Buyer",
    lastContact: "1 week ago",
    avatar: "SJ",
  },
  {
    id: "3",
    name: "Robert Davis",
    email: "robert.d@example.com",
    phone: "(555) 456-7890",
    status: "Seller",
    lastContact: "3 days ago",
    avatar: "RD",
  },
  {
    id: "4",
    name: "Emily Wilson",
    email: "emily.w@example.com",
    phone: "(555) 789-0123",
    status: "Buyer",
    lastContact: "Today",
    avatar: "EW",
  },
]

export function ClientTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Contact</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback>{client.avatar}</AvatarFallback>
                </Avatar>
                {client.name}
              </div>
            </TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.phone}</TableCell>
            <TableCell>
              <Badge variant={client.status === "Seller" ? "secondary" : "default"}>{client.status}</Badge>
            </TableCell>
            <TableCell>{client.lastContact}</TableCell>
            <TableCell className="text-right">
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

