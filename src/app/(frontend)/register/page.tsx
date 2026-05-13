"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {registerUser} from "./actions"
import {useActionState} from 'react'
import { useRouter } from "next/navigation"

export default function Register() {
  const [state, formAction] = useActionState(registerUser, {error:null, success:null})
    const router = useRouter()

  return (
  <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-6">
    <Card className="w-full max-w-md rounded-3xl border-0 bg-slate-50 p-2 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-4xl font-bold tracking-tight text-slate-950">
          Create account
        </CardTitle>

        <p className="text-sm text-slate-500">
          Start tracking your expenses today
        </p>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input name="name" placeholder="Enter your name" />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input name="email" type="email" placeholder="Enter your email" />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input name="password" type="password" placeholder="Enter your password" />
          </div>

          {state.error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {state.error}
            </div>
          )}

          {state.success && (
            <div className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
              {state.success}
            </div>
          )}

          <Button
            type="submit"
            className="mt-2 w-full bg-indigo-600 text-white hover:bg-indigo-500"
          >
            Create account
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="font-medium text-indigo-600 hover:text-indigo-500 underline underline-offset-4"
          >
            Login
          </button>
        </div>
      </CardContent>
    </Card>
  </div>
)
}