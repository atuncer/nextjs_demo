import Link from "next/link"
import { Plane } from "lucide-react"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
      >
        <Plane className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          Aviation Routing
        </span>
      </Link>
      <Link
        href="/locations"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Locations
      </Link>
      <Link
        href="/transportations"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Transportations
      </Link>
      <Link
        href="/routes"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Routes
      </Link>
    </nav>
  )
}
