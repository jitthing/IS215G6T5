"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "~/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { toast } from "~/components/ui/use-toast"

const buyerFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contact: z.string().min(8, { message: "Contact must be at least 8 characters." }),
  preferences: z.string().min(10, { message: "Preferences must be at least 10 characters." }),
})

type BuyerFormValues = z.infer<typeof buyerFormSchema>

interface BuyerFormProps {
  onSuccess?: () => void
}

export function BuyerForm({ onSuccess }: BuyerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<BuyerFormValues>({
    resolver: zodResolver(buyerFormSchema),
    defaultValues: {
      name: "",
      contact: "",
      preferences: "",
    },
  })

  async function onSubmit(data: BuyerFormValues) {
    setIsSubmitting(true)
    
    try {
      const MATCHING_SERVICE = process.env.NEXT_PUBLIC_MATCHING_SERVICE
      const response = await fetch(`${MATCHING_SERVICE}/buyers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to add buyer")
      }

      toast({
        title: "Success",
        description: "New buyer has been added",
      })

      // Reset the form
      form.reset()
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Error adding buyer:", error)
      toast({
        title: "Error",
        description: "Failed to add buyer. Please try again.",
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
                <Input placeholder="John Doe" {...field} />
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
        <FormField
          control={form.control}
          name="preferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferences</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Looking for a 3-room flat in Ang Mo Kio with good ventilation, near MRT, budget $300k"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Buyer"}
        </Button>
      </form>
    </Form>
  )
}
