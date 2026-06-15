
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type DashboardInfoProps = {
    balance: number
  totalExpances: number
  categoriesLen: number
  totalMonthExpences: number
  totalTrans: number
}

export default function DashBoardInfo({balance, totalExpances, categoriesLen, totalMonthExpences, totalTrans}:DashboardInfoProps){
return (
  <div className="space-y-4">

    {/* BALANCE */}
    <Card className="rounded-3xl border-0 bg-[var(--card)] shadow-[var(--shadow-card)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-[var(--text-primary)]">
          Current Balance
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-end justify-between">
          <p
            className={`text-4xl font-bold tracking-tight ${
              balance >= 0
                ? "text-[var(--success)]"
                : "text-[var(--destructive)]"
            }`}
          >
            ${balance}
          </p>

          <div className="rounded-full bg-[var(--secondary-surface)]/20 px-3 py-1 text-xs text-[var(--text-primary)]">
            Updated now
          </div>
        </div>
      </CardContent>
    </Card>

    {/* STATS */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

      <Card className="rounded-2xl border-0 bg-[var(--secondary-surface)] shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-[var(--text-primary)]">Total expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold tracking-tight text-[var(--accent)]">
            ${totalExpances}
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-0 bg-[var(--secondary-surface)] shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-[var(--text-primary)]">This month</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold tracking-tight text-[var(--accent)]">
            ${totalMonthExpences}
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-0 bg-[var(--secondary-surface)] shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-[var(--text-primary)]">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold tracking-tight text-[var(--accent)]">
            {categoriesLen}
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-0 bg-[var(--secondary-surface)] shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-[var(--text-primary)]">Total transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold tracking-tight text-[var(--accent)]">
            {totalTrans}
          </p>
        </CardContent>
      </Card>

    </div>
  </div>
);
}