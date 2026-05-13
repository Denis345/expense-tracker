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

import {useState} from 'react'
import { useRouter } from "next/navigation"


export default function Login(){
  
  const router = useRouter()

    const [errorState, seterrorState] = useState({error:null, success:null})
    const [isLoading, setIsLoading] = useState(false)

    async function tryLogin(event:React.ChangeEvent<HTMLFormElement>){
      setIsLoading(true)
      event.preventDefault()

      const formData = new FormData(event.currentTarget)
      
      const email = formData.get("email") as string
      const password = formData.get("password") as string
      
     try{
          const  res = await fetch("/api/users/login", {
              "method":"POST",
              "headers":{"Content-Type":"application/json"},
              body:JSON.stringify({email, password})
          })

          const resData = await res.json()
          console.log('----------- ',resData)
          
          if(res.ok)router.push("/dashboard")
          else seterrorState({error:resData?.errors?.[0]?.message, success:null})

      }
      catch(error:any){
          console.log('111111111', error.message)
          return {
              error:  error?.message,
              success:null
          }
      }
      finally{
        setIsLoading(false)
      }

      

    }

return (
  <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-6">
    <Card className="w-full max-w-md rounded-3xl border-0 bg-slate-50 p-2 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-4xl font-bold tracking-tight text-slate-950">
          Welcome back
        </CardTitle>

        <p className="text-sm text-slate-500">
          Login to continue tracking your expenses
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={tryLogin} className="flex flex-col gap-4">

            <div className="space-y-2">
              <Label>Email</Label>
              <Input  name="email" type="email" placeholder="Enter your email" />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input  name="password" type="password" placeholder="Enter your password" />
            </div>

            {errorState.error && <div>{errorState.error}</div> }
            {errorState.success && <div>{errorState.success}</div> }
               <Button
               disabled={isLoading}
            type="submit"
            className="mt-2 w-full bg-indigo-600 text-white hover:bg-indigo-500"
          >
            {isLoading ? "Login..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="font-medium text-indigo-600 hover:text-indigo-500 underline underline-offset-4"
          >
            Register
          </button>
        </div>
      </CardContent>
    </Card>
  </div>
)
}