
"use client"
import type { ExpencesS } from "./types"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {Button} from "@/components/ui/button"
import {useRouter} from "next/navigation"
import {useState} from 'react'
import type {Categories} from './types'

export default function ExpensesList({ expances }: { expances: ExpencesS[]}) {
    const [delExpence, setDelExpence] = useState<null | ExpencesS >(null)

    const router = useRouter()

    async function deleteExpance(expense: ExpencesS){
        console.log('expense-----', expense)
        const res = await fetch(`/api/expenses/${expense.id}`, {
            method:"DELETE"
        })

        if(res.ok){
            router.refresh()
        }

    }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
        <p className="text-sm text-gray-500">
          Your latest spending records
        </p>
      </CardHeader>

      <CardContent>

        {delExpence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-slate-950">
                Delete expense?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
                Are you sure you want to delete expense for{" "}
                <span className="font-medium text-slate-900">
                ${delExpence.amount}
                </span>
                ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-2">
                <Button
                variant="outline"
                onClick={() => setDelExpence(null)}
                >
                Cancel
                </Button>

                <Button
                onClick={() => {
                    deleteExpance(delExpence)
                    setDelExpence(null)
                }}
                className="bg-red-600 text-white hover:bg-red-500"
                >
                Delete
                </Button>
            </div>
            </div>
        </div>
        )}


        <div className="space-y-3">
          {expances.map((expense) => (
            <div
              key={expense.id}
              className="rounded-xl border bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-2xl font-bold text-black">
                    ${expense.amount}
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {(expense.category as Categories).name}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <p className="text-xs text-gray-500">
                        {new Date(expense.date).toLocaleDateString()}
                    </p>

                    <Button
                        variant="ghost"
                        onClick={() =>{ 
                            setDelExpence(expense)
                        }}
                        className="h-7 px-2 text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                        Delete
                    </Button>

                </div>
              </div>

              {expense.comment && (
                <p className="mt-3 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-600">
                  {expense.comment}
                </p>
              )}

            </div>
          ))}
          
        </div>
      </CardContent>
    </Card>
  )
}