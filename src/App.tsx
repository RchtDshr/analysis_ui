import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

function Main() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-md rounded-lg transition-all duration-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Welcome to ADmyBRAND Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Sleek Apple-style dashboard starter.
          </p>

          {/* Apple-like hover button */}
          <Button className="w-full hover:shadow-lg transition-all">
            Get Started
          </Button>

          {/* Skeleton Loader */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default Main
