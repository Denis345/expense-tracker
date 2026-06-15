"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ArrowUp
} from "lucide-react"

import { useState } from "react"

import type {Sources } from  './types'
import { useRouter } from 'next/navigation'
import {addEvent} from "@/lib/addEvent"
import {EVENT_MESSAGES} from "@/constants/eventMessages"


export default  function AddIncomeDialog({sources}:{sources:Sources[]}) {
  const [addExpenseIsOpen, setAddExpenseIsOpen] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [success, setSuccess] = useState<null | string>(null)
  const [sourceid, setSource] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter() 

  


  function openDialog() {
    setAddExpenseIsOpen(true)
    setError(null)
    setSuccess(null)
  }

  function closeDialog() {
    setAddExpenseIsOpen(false)
    setError(null)
    setSuccess(null)
    setSource("")
  }

  async function saveIncome(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)
    const formData = new FormData(event.currentTarget)
    console.log(formData)
    const amount = (formData.get("amount"))
    const date = formData.get("date")
    const categorIncome = Number(sourceid)
    const comment = formData.get("comment")

    console.log('amount ',amount,  'date ',date, 'category ',categorIncome, 'comment ',comment)
    try{
        const res = await fetch("/api/incomes", {
        "method":"POST", 
        "headers":{"Content-Type":"application/json"},
        "body":JSON.stringify({
            amount, 
            date,
            categorIncome,
            comment
        })
        })

        const data  =await res.json()
        if(res.status===401 || res.status===403){
          router.push('/login')
          return
        }
        if(!res.ok){
            console.log('data ',data.errors[0].message)
            setError(data?.errors?.[0]?.message || "Something went wrong")
        }
        if(res.ok){
            console.log('data ',data.message)
            setSuccess(data.message)
            setAddExpenseIsOpen(false)
            await addEvent(`${EVENT_MESSAGES.INCOME_CREATED} for ${amount}$`)
            router.refresh()
        }
    }

    catch(error){
        console.log('errorr',error)
    }
    finally{
      setIsLoading(false)
    }



  }

  return (
  <div className="flex-1 h-11">
    <Button
      onClick={openDialog}
      className="w-full h-full bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[var(--shadow-button)] hover:opacity-90"
    >
      Add income
      <ArrowUp className="h-10 w-10" />
    </Button>

    {addExpenseIsOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <Card className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-primary)] shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-[var(--text-primary)]">Add income</CardTitle>
            <p className="text-sm text-[var(--text-muted)]">
              Track a new spending record.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={saveIncome} className="space-y-5">
              <div className="grid gap-4">

                {/* Amount */}
                <div className="space-y-2">
                  <Label className="text-[var(--text-secondary)]">Amount</Label>
                  <Input
                    name="amount"
                    type="number"
                    placeholder="1200"
                    className="w-full rounded-md border border-[var(--border)] bg-[var(--secondary-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:ring-2 focus:ring-[var(--ring)]"
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label className="text-[var(--text-secondary)]">Date</Label>
                  <Input
                    name="date"
                    type="date"
                    className="w-full rounded-md border border-[var(--border)] bg-[var(--secondary-surface)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--ring)]"
                  />
                </div>

                {/* Source */}
                <div className="space-y-2">
                  <Label className="text-[var(--text-secondary)]">Source</Label>
                  <Select value={sourceid} onValueChange={setSource}>
                    <SelectTrigger className="w-full border border-[var(--border)] bg-[var(--secondary-surface)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--ring)]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent
                      position="popper"
                      className="max-h-60 border border-[var(--border)] bg-[var(--popover)] text-[var(--popover-foreground)] shadow-[var(--shadow-card)]"
                    >
                      {sources.map((sours) => (
                        <SelectItem
                          key={sours.id}
                          value={String(sours.id)}
                          className="text-[var(--text-primary)] focus:bg-[var(--secondary-surface)] focus:text-[var(--text-primary)]"
                        >
                          {sours.icon}
                          {sours.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Comment */}
                <div className="space-y-2">
                  <Label className="text-[var(--text-secondary)]">Comment</Label>
                  <textarea
                    name="comment"
                    placeholder="Optional note..."
                    className="w-full min-h-24 rounded-md border border-[var(--border)] bg-[var(--secondary-surface)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-[var(--ring)]"
                  />
                </div>

              </div>

              {/* Error */}
              {error && (
                <div className="rounded-md border border-[var(--destructive)]/30 bg-[var(--destructive)]/10 px-3 py-2 text-sm text-[var(--destructive)]">
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="rounded-md border border-[var(--success)]/30 bg-[var(--success)]/10 px-3 py-2 text-sm text-[var(--success)]">
                  {success}
                </div>
              )}

              {/* Footer Buttons */}
              <div className="flex justify-end gap-2 border-t border-[var(--border)] pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeDialog}
                  className="border border-[var(--border)] bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary-surface)]"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[var(--shadow-button)] hover:opacity-90 disabled:opacity-60"
                >
                  {isLoading ? "Save income..." : "Save income"}
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    )}
  </div>
)
}