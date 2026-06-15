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

import {addEvent} from "@/lib/addEvent"
import {EVENT_MESSAGES} from "@/constants/eventMessages"

import { useState } from "react"

import type {Categories } from  './types'
import { useRouter } from 'next/navigation'

import {
  ArrowDown
} from "lucide-react"


export default  function AddExpenseDialog({categories}:{categories:Categories[]}) {
  const [addExpenseIsOpen, setAddExpenseIsOpen] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [success, setSuccess] = useState<null | string>(null)
  const [categoryid, setCategory] = useState("")
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
    setCategory("")
  }

  async function saveExpance(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)
    const formData = new FormData(event.currentTarget)
    console.log(formData)
    const amount = (formData.get("amount"))
    const date = formData.get("date")
    const category = Number(categoryid)
    const comment = formData.get("comment")

    console.log('amount ',amount,  'date ',date, 'category ',category, 'comment ',comment)
    try{
        const res = await fetch("/api/expenses", {
        "method":"POST", 
        "headers":{"Content-Type":"application/json"},
        "body":JSON.stringify({
            amount, 
            date,
            category,
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
            await addEvent(`${EVENT_MESSAGES.EXPENSE_CREATED} for ${amount}$`)
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
      className="h-full w-full bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[var(--shadow-button)] transition hover:opacity-90"
    >
      Add expense
      <ArrowDown className="h-10 w-10" />
    </Button>

    {addExpenseIsOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
        <Card className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-primary)] shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-[var(--text-primary)]">
              Add expense
            </CardTitle>

            <p className="text-sm text-[var(--text-muted)]">
              Track a new spending record.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={saveExpance} className="space-y-5">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label className="text-[var(--text-secondary)]">
                    Amount
                  </Label>

                  <Input
                    name="amount"
                    type="number"
                    placeholder="1200"
                    className="border-[var(--border)] bg-[var(--secondary-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:ring-[var(--ring)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[var(--text-secondary)]">
                    Date
                  </Label>

                  <Input
                    name="date"
                    type="date"
                    className="border-[var(--border)] bg-[var(--secondary-surface)] text-[var(--text-primary)] focus-visible:ring-[var(--ring)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[var(--text-secondary)]">
                    Category
                  </Label>

                  <Select value={categoryid} onValueChange={setCategory}>
                    <SelectTrigger className="w-full border-[var(--border)] bg-[var(--secondary-surface)] text-[var(--text-primary)] focus:ring-[var(--ring)]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent
                      position="popper"
                      className="max-h-60 border-[var(--border)] bg-[var(--popover)] text-[var(--popover-foreground)] shadow-[var(--shadow-card)]"
                    >
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                          className="text-[var(--text-primary)] focus:bg-[var(--secondary-surface)] focus:text-[var(--text-primary)]"
                        >
                          {category.icon}
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[var(--text-secondary)]">
                    Comment
                  </Label>

                  <textarea
                    name="comment"
                    className="min-h-24 w-full rounded-md border border-[var(--border)] bg-[var(--secondary-surface)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:ring-2 focus:ring-[var(--ring)]"
                    placeholder="Optional note..."
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-md border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-3 py-2 text-sm text-[var(--danger)]">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-md border border-[var(--success)]/30 bg-[var(--success)]/10 px-3 py-2 text-sm text-[var(--success)]">
                  {success}
                </div>
              )}

              <div className="flex justify-end gap-2 border-t border-[var(--border)] pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeDialog}
                  className="border-[var(--border)] bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary-surface)]"
                >
                  Cancel
                </Button>

                <Button
                  disabled={isLoading}
                  type="submit"
                  className="bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[var(--shadow-button)] hover:opacity-90 disabled:opacity-60"
                >
                  {isLoading ? "Save expense..." : "Save expense"}
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