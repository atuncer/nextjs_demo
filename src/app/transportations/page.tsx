"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Trash2, Pencil } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TransportationsService, type Transportation, LocationsService, type Location } from "@/lib/api"

export default function TransportationsPage() {
  const [transportations, setTransportations] = useState<Transportation[]>([])
  const [locations, setLocations] = useState<Record<number, Location>>({})
  const [loading, setLoading] = useState(true)

  const fetchTransportations = async () => {
    try {
      setLoading(true)
      const [transData, locData] = await Promise.all([
        TransportationsService.listTransportations(0, 100),
        LocationsService.listLocations(0, 100)
      ])

      setTransportations(transData)

      // Create a map of locations for easy lookup
      const locMap: Record<number, Location> = {}
      locData.forEach(loc => {
        if (loc.id) locMap[loc.id] = loc
      })
      setLocations(locMap)

    } catch (error) {
      toast.error("Failed to fetch data")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransportations()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await TransportationsService.deleteTransportation(id)
      toast.success("Transportation deleted successfully")
      fetchTransportations()
    } catch (error) {
      toast.error("Failed to delete transportation")
      console.error(error)
    }
  }

  const getLocationName = (id: number) => {
    return locations[id]?.name || `ID: ${id}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transportations</h1>
          <p className="text-muted-foreground">
            Manage flights and other transport options.
          </p>
        </div>
        <Button asChild>
          <Link href="/transportations/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Transportation
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Operating Days</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : transportations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No transportations found.
                </TableCell>
              </TableRow>
            ) : (
              transportations.map((transportation) => (
                <TableRow key={transportation.id}>
                  <TableCell>{transportation.id}</TableCell>
                  <TableCell className="font-medium">{transportation.transportationType}</TableCell>
                  <TableCell>{getLocationName(transportation.originLocationId)}</TableCell>
                  <TableCell>{getLocationName(transportation.destinationLocationId)}</TableCell>
                  <TableCell>
                    {transportation.operatingDays?.sort().join(", ") || "All"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/transportations/${transportation.id}`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the transportation.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => transportation.id && handleDelete(transportation.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
