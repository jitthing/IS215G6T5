"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const HOUSING_PRICE_PREDICTOR = process.env.NEXT_PUBLIC_HOUSING_PRICE_PREDICTOR;

const formSchema = z.object({
  size: z.coerce.number().positive("Floor area must be positive"),
  lease: z.coerce.number().positive("Remaining lease must be positive"),
  remaining_months: z.coerce
    .number()
    .min(0, "Months must be non-negative")
    .max(11, "Months must be less than 12"),
  // monthsSinceJan2017: z.coerce.number().min(0, "Months must be non-negative"),
  flat_type: z.enum(["2/3 room", "4/5 room", "Executive/Multi"]),
  floor_cat: z.enum(["low", "medium", "high"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function HousingPricePredictor() {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      size: 0,
      lease: 0,
      remaining_months: 0,
      // monthsSinceJan2017: 0,
      flat_type: "2/3 room",
      floor_cat: "low",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);

    try {
      // In a real application, this would be an API call to your backend
      // For demonstration, we'll simulate a response
      const price = await fetch(`${HOUSING_PRICE_PREDICTOR}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const priceResponse = await price.json();
      setPrediction(priceResponse.price);
    } catch (error) {
      console.error("Error predicting price:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Housing Price Predictor
        </CardTitle>
        <CardDescription>
          Enter property details to predict the housing price
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="size"
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
                name="lease"
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
                name="remaining_months"
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

            {/* <FormField
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
            /> */}

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
                      <SelectItem value="2/3 room">2/3 Room</SelectItem>
                      <SelectItem value="4/5 room">4/5 Room</SelectItem>
                      <SelectItem value="Executive/Multi">
                        Executive/Multi
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="floor_cat"
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
                      <SelectItem value="low">
                        Low (1st to 6th floor)
                      </SelectItem>
                      <SelectItem value="medium">
                        Medium (7th to 21st floor)
                      </SelectItem>
                      <SelectItem value="high">
                        High (Above 21st floor)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Floor height affects property value
                  </FormDescription>
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
          <div className="text-primary text-2xl font-bold">
            ${prediction.toLocaleString()}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
