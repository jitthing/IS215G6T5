"use client"

import { useState } from "react"
import { Calculator } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

const formSchema = z.object({
  floorArea: z.coerce.number().positive("Floor area must be positive"),
  remainingLeaseYears: z.coerce.number().positive("Remaining lease must be positive"),
  remainingLeaseMonths: z.coerce.number().min(0, "Months must be non-negative").max(11, "Months must be less than 12"),
  monthsSinceJan2017: z.coerce.number().min(0, "Months must be non-negative"),
  flatType: z.enum(["2/3 room", "4/5 room", "Executive/Multi"]),
  floorCategory: z.enum(["low", "medium", "high"]),
})

type FormValues = z.infer<typeof formSchema>

export default function HousingPricePredictor() {
  const [prediction, setPrediction] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      floorArea: 0,
      remainingLeaseYears: 0,
      remainingLeaseMonths: 0,
      monthsSinceJan2017: 0,
      flatType: "2/3 room",
      floorCategory: "low",
    },
  })

  async function onSubmit(values: FormValues) {
    setIsLoading(true)

    try {
      // In a real application, this would be an API call to your backend
      // For demonstration, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate a prediction based on inputs
      // This is just a placeholder formula - your actual model would be on the backend
      const basePrice = values.floorArea * 1000
      const leaseAdjustment = values.remainingLeaseYears * 500 + values.remainingLeaseMonths * 40
      const timeAdjustment = values.monthsSinceJan2017 * 100

      let typeMultiplier = 1.0
      if (values.flatType === "4/5 room") typeMultiplier = 1.2
      if (values.flatType === "Executive/Multi") typeMultiplier = 1.5

      let floorMultiplier = 1.0
      if (values.floorCategory === "medium") floorMultiplier = 1.1
      if (values.floorCategory === "high") floorMultiplier = 1.25

      const predictedPrice = Math.round(
        (basePrice + leaseAdjustment + timeAdjustment) * typeMultiplier * floorMultiplier,
      )

      setPrediction(predictedPrice)
    } catch (error) {
      console.error("Error predicting price:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Housing Price Predictor
        </CardTitle>
        <CardDescription>Enter property details to predict the housing price</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="floorArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Floor Area (sqm)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="remainingLeaseYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remaining Lease (years)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="remainingLeaseMonths"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Months</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="monthsSinceJan2017"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Months since January 2017</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="flatType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flat Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select flat type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2/3 room">2/3 Room</SelectItem>
                      <SelectItem value="4/5 room">4/5 Room</SelectItem>
                      <SelectItem value="Executive/Multi">Executive/Multi</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="floorCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Floor Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select floor category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low (1st to 6th floor)</SelectItem>
                      <SelectItem value="medium">Medium (7th to 21st floor)</SelectItem>
                      <SelectItem value="high">High (Above 21st floor)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Floor height affects property value</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Calculating..." : "Predict Price"}
            </Button>
          </form>
        </Form>
      </CardContent>

      {prediction !== null && (
        <CardFooter className="flex flex-col items-center">
          <div className="text-lg font-semibold">Predicted Price:</div>
          <div className="text-2xl font-bold text-primary">${prediction.toLocaleString()}</div>
        </CardFooter>
      )}
    </Card>
  )
}

