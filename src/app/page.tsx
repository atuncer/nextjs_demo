import Link from "next/link"
import { ArrowRight, MapPin, Plane, Route } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Link href="/locations">
        <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Locations
            </CardTitle>
            <CardDescription>
              Manage airports and cities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View, create, update, and delete locations in the system.
            </p>
            <div className="mt-4 flex items-center text-sm font-medium text-primary">
              Go to Locations <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link href="/transportations">
        <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Transportations
            </CardTitle>
            <CardDescription>
              Manage flights and other transport.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Configure transportation options between locations.
            </p>
            <div className="mt-4 flex items-center text-sm font-medium text-primary">
              Go to Transportations <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link href="/routes">
        <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="h-5 w-5" />
              Routes
            </CardTitle>
            <CardDescription>
              Find the best way to travel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Search for valid routes between two locations.
            </p>
            <div className="mt-4 flex items-center text-sm font-medium text-primary">
              Search Routes <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
