import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignOutButton } from "@/components/auth/sign-out-button"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col p-4 bg-background">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <SignOutButton />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {session.user?.name || "User"}</CardTitle>
            <CardDescription>You are now securely logged in</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This is a secure dashboard page that requires authentication.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
