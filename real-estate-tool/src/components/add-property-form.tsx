"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "~/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { toast } from "~/components/ui/use-toast"

const propertyFormSchema = z.object({
  property_type: z.string().min(1, { message: "Property type is required." }),
  floor_area_sqm: z.coerce.number().positive({ message: "Floor area must be positive." }),
  remaining_lease_years: z.coerce.number().min(0, { message: "Lease years must be non-negative." }),
  remaining_lease_months: z.coerce.number().min(0).max(11, { message: "Lease months must be between 0 and 11." }),
  flat_type: z.string().min(1, { message: "Flat type is required." }),
  floor_category: z.string().min(1, { message: "Floor category is required." }),
  town: z.string().min(1, { message: "Town is required." }),
  block: z.string().min(1, { message: "Block is required." }),
  street_name: z.string().min(1, { message: "Street name is required." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  asking_price: z.coerce.number().positive({ message: "Asking price must be positive." }),
})

type PropertyFormValues = z.infer<typeof propertyFormSchema>

interface AddPropertyFormProps {
  sellerId: string
  onSuccess?: () => void
}

export function AddPropertyForm({ sellerId, onSuccess }: AddPropertyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      property_type: "HDB",
      floor_area_sqm: 0,
      remaining_lease_years: 0,
      remaining_lease_months: 0,
      flat_type: "",
      floor_category: "low",
      town: "",
      block: "",
      street_name: "",
      description: "",
      asking_price: 0,
    },
  })

  async function onSubmit(data: PropertyFormValues) {
    setIsSubmitting(true)
    
    try {
      const MATCHING_SERVICE = process.env.NEXT_PUBLIC_MATCHING_SERVICE
      console.log("Submitting property to seller:", sellerId)
      console.log("Property data:", data)
      
      const response = await fetch(`${MATCHING_SERVICE}/sellers/${sellerId}/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json().catch(() => null)
      console.log("API response:", response.status, responseData)

      if (!response.ok) {
        throw new Error(`Failed to add property: ${response.status} ${response.statusText}${responseData ? ' - ' + JSON.stringify(responseData) : ''}`)
      }

      toast({
        title: "Success",
        description: "New property has been added",
      })

      // Reset the form
      form.reset()
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Error adding property:", error)
      toast({
        title: "Error",
        description: `Failed to add property: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="property_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="HDB">HDB</SelectItem>
                    <SelectItem value="CONDO">Condominium</SelectItem>
                    <SelectItem value="LANDED">Landed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="flat_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flat Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select flat type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1 ROOM">1 ROOM</SelectItem>
                    <SelectItem value="2 ROOM">2 ROOM</SelectItem>
                    <SelectItem value="3 ROOM">3 ROOM</SelectItem>
                    <SelectItem value="4 ROOM">4 ROOM</SelectItem>
                    <SelectItem value="5 ROOM">5 ROOM</SelectItem>
                    <SelectItem value="EXECUTIVE">EXECUTIVE</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="floor_area_sqm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor Area (sqm)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="floor_category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor Category</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select floor category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low Floor</SelectItem>
                    <SelectItem value="medium">Medium Floor</SelectItem>
                    <SelectItem value="high">High Floor</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="remaining_lease_years"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lease Years</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="remaining_lease_months"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lease Months</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="asking_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asking Price (SGD)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="town"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Town</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select town" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ANG MO KIO">ANG MO KIO</SelectItem>
                  <SelectItem value="BISHAN">BISHAN</SelectItem>
                  <SelectItem value="BUKIT MERAH">BUKIT MERAH</SelectItem>
                  <SelectItem value="BUKIT TIMAH">BUKIT TIMAH</SelectItem>
                  <SelectItem value="CENTRAL AREA">CENTRAL AREA</SelectItem>
                  <SelectItem value="CLEMENTI">CLEMENTI</SelectItem>
                  <SelectItem value="GEYLANG">GEYLANG</SelectItem>
                  <SelectItem value="KALLANG/WHAMPOA">KALLANG/WHAMPOA</SelectItem>
                  <SelectItem value="MARINE PARADE">MARINE PARADE</SelectItem>
                  <SelectItem value="QUEENSTOWN">QUEENSTOWN</SelectItem>
                  <SelectItem value="TAMPINES">TAMPINES</SelectItem>
                  <SelectItem value="TOA PAYOH">TOA PAYOH</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="block"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Block</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="street_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the property..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Property"}
        </Button>
      </form>
    </Form>
  )
}
