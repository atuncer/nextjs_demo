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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LocationsService } from "@/lib/api"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  locationCode: z.string().min(3, {
    message: "Location code must be at least 3 characters.",
  }),
})

export default function EditLocationPage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)
  const [loading, setLoading] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      country: "",
      city: "",
      locationCode: "",
    },
  })

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true)
        const location = await LocationsService.getLocation(id)
        form.reset({
          name: location.name,
          country: location.country,
          city: location.city,
          locationCode: location.locationCode,
        })
      } catch (error) {
        toast.error("Failed to fetch location details")
        console.error(error)
        router.push("/locations")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchLocation()
    }
  }, [id, form, router])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await LocationsService.updateLocation(id, values)
      toast.success("Location updated successfully")
      router.push("/locations")
    } catch (error) {
      toast.error("Failed to update location")
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
          <Link href="/locations">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Location</h1>
          <p className="text-muted-foreground">
            Update location details.
          </p>
        </div>
      </div>

      <div className="border rounded-md p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Istanbul Airport" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locationCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Code</FormLabel>
                  <FormControl>
                    <Input placeholder="IST" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Istanbul" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Türkiye" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" asChild>
                <Link href="/locations">Cancel</Link>
              </Button>
              <Button type="submit">Update Location</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
