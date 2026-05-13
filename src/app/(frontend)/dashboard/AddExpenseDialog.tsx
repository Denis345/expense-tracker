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

import { useState } from "react"

import type {Categories } from  './types'
import { useRouter } from 'next/navigation'


export default  function AddExpenseDialog({categories}:{categories:Categories[]}) {
  const [addExpenseIsOpen, setAddExpenseIsOpen] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [success, setSuccess] = useState<null | string>(null)
  const [categoryid, setCategory] = useState("")

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
            router.refresh()
        }
        
    }

    catch(error){
        console.log('errorr',error)
    }



  }

  return (
    <>
      <Button onClick={openDialog} className="bg-indigo-600 hover:bg-indigo-500 text-white">
        Add expense
      </Button>

      {addExpenseIsOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Card className="w-full max-w-md rounded-2xl shadow-xl">
            <CardHeader>
               <CardTitle>Add expense</CardTitle>
                <p className="text-sm text-gray-500">
                    Track a new spending record.
                    </p>
            </CardHeader>

            <CardContent>

                <form onSubmit={saveExpance} className="space-y-5">
                <div className="grid gap-4">
                    <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input
                        name="amount"
                        type="number"
                        placeholder="1200"
                    />
                    </div>

                    <div className="space-y-2">
                    <Label>Date</Label>
                    <Input name="date" type="date" />
                    </div>

                  <div className="space-y-2">
                    <Label>Category</Label>

                    <Select value={categoryid} onValueChange={setCategory}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>

                      <SelectContent position="popper" className="max-h-60">
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={String(category.id)}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                    <div className="space-y-2">
                    <Label>Comment</Label>
                    <textarea
                        name="comment"
                        className="min-h-24 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
                        placeholder="Optional note..."
                    />
                    </div>
                </div>

                {error && (
                    <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                    </div>
                )}

                {success && (
                    <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                    {success}
                    </div>
                )}

                <div className="flex justify-end gap-2 border-t pt-4">
                    <Button type="button" variant="outline" onClick={closeDialog}>
                    Cancel
                    </Button>

                    <Button type="submit">
                    Save expense
                    </Button>
                </div>
                </form>
            </CardContent>
          </Card>   
        </div>
      )}



    </>
  )
}