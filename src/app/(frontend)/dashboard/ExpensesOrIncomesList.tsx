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

import {addEvent} from "@/lib/addEvent"
import {EVENT_MESSAGES} from "@/constants/eventMessages"

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
      const category =
        typeof delExpence!.category === "object"
          ? delExpence!.category.name
          : delExpence!.category

      await addEvent(
        `${EVENT_MESSAGES.EXPENSE_DELETED}: ${delExpence!.amount}$ from category ${category}`
      )
      router.refresh()
    }
  }

  async function deleteIncome(income: IncomesS) {
    const res = await fetch(`/api/incomes/${income.id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      const Income =
        typeof delIncome!.categorIncome === "object"
          ? delIncome!.categorIncome.name
          : delIncome!.categorIncome

      await addEvent(
        `${EVENT_MESSAGES.INCOME_DELETED}: ${delIncome!.amount}$ from source ${Income}`
      )
      router.refresh()
    }
  }

return (
  <Card className="rounded-2xl border-0 bg-[var(--card)] shadow-[var(--shadow-card)]">

    <CardHeader>
      <div className="flex items-start justify-between gap-4">
        <div>
          <CardTitle className="text-[var(--text-primary)]">
            {showExpenses ? "Expenses" : "Incomes"}
          </CardTitle>
          <p className="text-sm text-[var(--text-muted)]">
            {showExpenses
              ? "Your latest spending records"
              : "Your latest income records"}
          </p>
        </div>

        <div className="flex flex-col gap-2 min-[550px]:flex-row">
          <Button
            type="button"
            onClick={() => setShowExpenses(true)}
            variant={showExpenses ? "default" : "outline"}
            className="bg-[var(--primary)] text-[var(--primary-foreground)]"
          >
            Expenses
          </Button>

          <Button
            type="button"
            onClick={() => setShowExpenses(false)}
            variant={!showExpenses ? "default" : "outline"}
            className="bg-[var(--primary)] text-[var(--primary-foreground)]"
          >
            Incomes
          </Button>
        </div>
      </div>
    </CardHeader>

    <CardContent>
      {/* Delete expense modal */}
      {delExpence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-[var(--card)] p-6 shadow-[var(--shadow-card)]">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Delete expense?
            </h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Are you sure you want to delete expense for{" "}
              <span className="font-medium text-[var(--text-primary)]">
                ${delExpence.amount}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDelExpence(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  deleteExpance(delExpence);
                  setDelExpence(null);
                }}
                className="bg-[var(--destructive)] text-[var(--destructive-foreground)]"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete income modal */}
      {delIncome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-[var(--card)] p-6 shadow-[var(--shadow-card)]">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Delete income?
            </h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Are you sure you want to delete income for{" "}
              <span className="font-medium text-[var(--text-primary)]">
                ${delIncome.amount}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDelIncome(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  deleteIncome(delIncome);
                  setDelIncome(null);
                }}
                className="bg-[var(--destructive)] text-[var(--destructive-foreground)]"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Expenses list */}
      {showExpenses ? (
        <div className="space-y-3">
          {expances.map((expense) => (
            <div
              key={expense.id}
              className="rounded-xl border bg-[var(--card)] p-4 shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className={`text-2xl font-bold tracking-tight ${
                      expense.amount >= 0
                        ? "text-[var(--success)]"
                        : "text-[var(--destructive)]"
                    }`}
                  >
                    ${expense.amount}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[var(--text-secondary)]">
                    {typeof expense.category === "object" && expense.category.icon}{" "}
                    {(expense.category as Categories).name}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="text-xs text-[var(--text-muted)]">
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => setDelExpence(expense)}
                    className="h-7 px-2 text-xs text-[var(--destructive)] hover:bg-[var(--destructive)]/10 hover:text-[var(--destructive-foreground)]"
                  >
                    Delete
                  </Button>
                </div>
              </div>

              {expense.comment && (
                <p className="mt-3 rounded-md bg-[var(--secondary-surface)] px-3 py-2 text-sm text-[var(--text-secondary)]">
                  {expense.comment}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Incomes list */
        <div className="space-y-3">
          {incomes.map((income) => (
            <div
              key={income.id}
              className="rounded-xl border bg-[var(--card)] p-4 shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-2xl font-bold tracking-tight text-[var(--success)]">
                    ${income.amount}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[var(--text-secondary)]">
                    {typeof income.categorIncome === "object" &&
                      income.categorIncome.icon}{" "}
                    {(income.categorIncome as Sources).name}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="text-xs text-[var(--text-muted)]">
                    {new Date(income.date).toLocaleDateString()}
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => setDelIncome(income)}
                    className="h-7 px-2 text-xs text-[var(--destructive)] hover:bg-[var(--destructive)]/10 hover:text-[var(--destructive-foreground)]"
                  >
                    Delete
                  </Button>
                </div>
              </div>

              {income.comment && (
                <p className="mt-3 rounded-md bg-[var(--secondary-surface)] px-3 py-2 text-sm text-[var(--text-secondary)]">
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