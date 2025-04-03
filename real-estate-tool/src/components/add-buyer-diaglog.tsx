"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { BuyerForm } from "./forms/buyer-form"

interface AddClientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddBuyerDialog({ open, onOpenChange }: AddClientDialogProps) {
//   const [activeTab, setActiveTab] = useState("buyer")

  const handleSuccess = () => {
    // Close the dialog after successful submission
    onOpenChange(false)
    // Additional logic like showing a success message or refreshing data could go here
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Seller</DialogTitle>
          <DialogDescription>
            Enter the details for your new Seller
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
        <BuyerForm onSuccess={handleSuccess} />
          {/* <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buyer">Buyer</TabsTrigger>
            </TabsList>
            <TabsContent value="buyer" className="mt-4">
            
            </TabsContent>
          </Tabs> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
