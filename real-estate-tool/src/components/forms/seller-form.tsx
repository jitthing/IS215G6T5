"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "~/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { toast } from "~/components/ui/use-toast"

const sellerFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contact: z.string().min(8, { message: "Contact must be at least 8 characters." }),
})

type SellerFormValues = z.infer<typeof sellerFormSchema>

interface SellerFormProps {
  onSuccess?: () => void
}

export default function SellerForm({ onSuccess }: SellerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<SellerFormValues>({
    resolver: zodResolver(sellerFormSchema),
    defaultValues: {
      name: "",
      contact: "",
    },
  })

  async function onSubmit(data: SellerFormValues) {
    setIsSubmitting(true)
    
    try {
      const MATCHING_SERVICE = process.env.NEXT_PUBLIC_MATCHING_SERVICE
      const response = await fetch(`${MATCHING_SERVICE}/sellers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to add seller")
      }

      toast({
        title: "Success",
        description: "New seller has been added",
      })

      // Reset the form
      form.reset()
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Error adding seller:", error)
      toast({
        title: "Error",
        description: "Failed to add seller. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Sarah Johnson" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact</FormLabel>
              <FormControl>
                <Input placeholder="(555) 123-4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Seller"}
        </Button>
      </form>
    </Form>
  )
}
