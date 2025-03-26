import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"

const leads = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    status: "Buyer",
    avatar: "JS",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    status: "Buyer",
    avatar: "SJ",
  },
  {
    id: "3",
    name: "Robert Davis",
    email: "robert.d@example.com",
    status: "Seller",
    avatar: "RD",
  },
  {
    id: "4",
    name: "Emily Wilson",
    email: "emily.w@example.com",
    status: "Buyer",
    avatar: "EW",
  },
]

export function RecentLeads() {
  return (
    <div className="space-y-4">
      {leads.map((lead) => (
        <div key={lead.id} className="flex items-center">
          <div className="flex items-center gap-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
              <AvatarFallback>{lead.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{lead.name}</p>
              <p className="text-sm text-muted-foreground">{lead.email}</p>
            </div>
          </div>
          <div className="ml-auto">
            <Badge variant={lead.status === "Seller" ? "secondary" : "default"}>{lead.status}</Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

