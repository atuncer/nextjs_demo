"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, Search } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LocationsService, RoutesService, type Location, type Route } from "@/lib/api"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
  originLocationId: z.string().min(1, { message: "Origin is required" }),
  destinationLocationId: z.string().min(1, { message: "Destination is required" }),
  date: z.date().optional(),
})

export default function RoutesPage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [routes, setRoutes] = useState<Route[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originLocationId: "",
      destinationLocationId: "",
    },
  })

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await LocationsService.listLocations(0, 100)
        setLocations(data)
      } catch (error) {
        toast.error("Failed to fetch locations")
        console.error(error)
      }
    }
    fetchLocations()
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.originLocationId === values.destinationLocationId) {
      form.setError("destinationLocationId", {
        type: "manual",
        message: "Destination must be different from Origin"
      })
      return
    }

    try {
      setLoading(true)
      setSearched(true)
      const data = await RoutesService.findRoutes(
        Number(values.originLocationId),
        Number(values.destinationLocationId),
        values.date ? format(values.date, "yyyy-MM-dd") : undefined,
      )
      setRoutes(data)
    } catch (error) {
      toast.error("Failed to find routes")
      console.error(error)
      setRoutes([])
    } finally {
      setLoading(false)
    }
  }

  const getLocationName = (id: number) => {
    const loc = locations.find(l => l.id === id)
    return loc ? `${loc.name} (${loc.locationCode})` : `ID: ${id}`
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Find Routes</h1>
        <p className="text-muted-foreground">
          Search for the best way to travel between locations.
        </p>
      </div>

      <div className="border rounded-md p-6 bg-card">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="originLocationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select origin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location.id} value={String(location.id)}>
                            {location.name} ({location.locationCode})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destinationLocationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location.id} value={String(location.id)}>
                            {location.name} ({location.locationCode})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date (Optional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full md:w-auto" disabled={loading}>
              {loading ? "Searching..." : (
                <>
                  <Search className="mr-2 h-4 w-4" /> Find Routes
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>

      {searched && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Search Results</h2>
          {routes.length === 0 ? (
            <div className="text-center py-12 border rounded-md bg-muted/20">
              <p className="text-muted-foreground">No routes found for your criteria.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {routes.map((route, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Route Option {index + 1}</span>
                      <Badge variant="secondary">
                        {route.segments?.length || 0} Stop(s)
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      From {getLocationName(route.segments?.[0]?.transportation.originLocationId!)} to {getLocationName(route.segments?.[route.segments.length - 1]?.transportation.destinationLocationId!)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {route.segments?.map((segment, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 border rounded-md bg-muted/10">
                          <div className="flex-1">
                            <div className="font-medium">
                              {getLocationName(segment.transportation.originLocationId!)} → {getLocationName(segment.transportation.destinationLocationId!)}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {segment.transportation.transportationType}
                            </div>
                          </div>
                          <div className="text-sm font-medium">
                            Step {idx + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
