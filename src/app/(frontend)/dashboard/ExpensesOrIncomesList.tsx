"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import type { Categories, Sources, ExpencesS, IncomesS } from "./types"

export default function ExpensesOrIncomesList({
  expances,
  incomes,
}: {
  expances: ExpencesS[]
  incomes: IncomesS[]
}) {
  const [delExpence, setDelExpence] = useState<null | ExpencesS>(null)
  const [delIncome, setDelIncome] = useState<null | IncomesS>(null)
  const [showExpenses, setShowExpenses] = useState(true)

  const router = useRouter()

  async function deleteExpance(expense: ExpencesS) {
    const res = await fetch(`/api/expenses/${expense.id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      router.refresh()
    }
  }

  async function deleteIncome(income: IncomesS) {
    const res = await fetch(`/api/incomes/${income.id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      router.refresh()
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>
              {showExpenses ? "Expenses" : "Incomes"}
            </CardTitle>

            <p className="text-sm text-gray-500">
              {showExpenses
                ? "Your latest spending records"
                : "Your latest income records"}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => setShowExpenses(true)}
              variant={showExpenses ? "default" : "outline"}
            >
              Expenses
            </Button>

            <Button
              type="button"
              onClick={() => setShowExpenses(false)}
              variant={!showExpenses ? "default" : "outline"}
            >
              Incomes
            </Button>
          </div>
        </div>
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

        {delIncome && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
              <h2 className="text-lg font-semibold text-slate-950">
                Delete income?
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Are you sure you want to delete income for{" "}
                <span className="font-medium text-slate-900">
                  ${delIncome.amount}
                </span>
                ? This action cannot be undone.
              </p>

              <div className="mt-6 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setDelIncome(null)}
                >
                  Cancel
                </Button>

                <Button
                  onClick={() => {
                    deleteIncome(delIncome)
                    setDelIncome(null)
                  }}
                  className="bg-red-600 text-white hover:bg-red-500"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {showExpenses ? (
          <div className="space-y-3">
            {expances.map((expense) => (
              <div
                key={expense.id}
                className="rounded-xl border bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
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
                      onClick={() => setDelExpence(expense)}
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
        ) : (
          <div className="space-y-3">
            {incomes.map((income) => (
              <div
                key={income.id}
                 className="rounded-xl border bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-2xl font-bold text-black">
                      ${income.amount}
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {(income.categorIncome as Sources).name}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="text-xs text-gray-500">
                      {new Date(income.date).toLocaleDateString()}
                    </p>

                    <Button
                      variant="ghost"
                      onClick={() => setDelIncome(income)}
                      className="h-7 px-2 text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                {income.comment && (
                  <p className="mt-3 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-600">
                    {income.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}