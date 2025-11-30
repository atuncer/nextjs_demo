"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter, useParams } from "next/navigation"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox"
import { LocationsService, TransportationsService, TransportationType, type Location } from "@/lib/api"

const formSchema = z.object({
  originLocationId: z.string().min(1, { message: "Origin is required" }),
  destinationLocationId: z.string().min(1, { message: "Destination is required" }),
  transportationType: z.nativeEnum(TransportationType),
  operatingDays: z.array(z.number()).min(1, { message: "Select at least one operating day" }),
})

const DAYS = [
  { id: 1, label: "Monday" },
  { id: 2, label: "Tuesday" },
  { id: 3, label: "Wednesday" },
  { id: 4, label: "Thursday" },
  { id: 5, label: "Friday" },
  { id: 6, label: "Saturday" },
  { id: 7, label: "Sunday" },
]

export default function EditTransportationPage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)
  const [loading, setLoading] = useState(true)
  const [locations, setLocations] = useState<Location[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originLocationId: "",
      destinationLocationId: "",
      transportationType: TransportationType.FLIGHT,
      operatingDays: [],
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [locData, transData] = await Promise.all([
          LocationsService.listLocations(0, 100),
          TransportationsService.getTransportation(id)
        ])
        setLocations(locData)

        form.reset({
          originLocationId: String(transData.originLocationId),
          destinationLocationId: String(transData.destinationLocationId),
          transportationType: transData.transportationType,
          operatingDays: transData.operatingDays || [],
        })
      } catch (error) {
        toast.error("Failed to fetch transportation details")
        console.error(error)
        router.push("/transportations")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id, form, router])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.originLocationId === values.destinationLocationId) {
      form.setError("destinationLocationId", {
        type: "manual",
        message: "Destination must be different from Origin"
      })
      return
    }

    try {
      await TransportationsService.updateTransportation(id, {
        originLocationId: Number(values.originLocationId),
        destinationLocationId: Number(values.destinationLocationId),
        transportationType: values.transportationType,
        operatingDays: values.operatingDays,
      })
      toast.success("Transportation updated successfully")
      router.push("/transportations")
    } catch (error) {
      toast.error("Failed to update transportation")
      console.error(error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/transportations">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Transportation</h1>
          <p className="text-muted-foreground">
            Update transportation details.
          </p>
        </div>
      </div>

      <div className="border rounded-md p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="originLocationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
            </div>

            <FormField
              control={form.control}
              name="transportationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(TransportationType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
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
              name="operatingDays"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Operating Days</FormLabel>
                    <FormDescription>
                      Select the days this transportation operates.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {DAYS.map((day) => (
                      <FormField
                        key={day.id}
                        control={form.control}
                        name="operatingDays"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={day.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(day.id)}
                                  onCheckedChange={(checked) => {
                                    const currentValue = field.value || []
                                    return checked
                                      ? field.onChange([...currentValue, day.id])
                                      : field.onChange(
                                        currentValue.filter(
                                          (value) => value !== day.id
                                        )
                                      )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {day.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button variant="outline" asChild>
                <Link href="/transportations">Cancel</Link>
              </Button>
              <Button type="submit">Update Transportation</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
