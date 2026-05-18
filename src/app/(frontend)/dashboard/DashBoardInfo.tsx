import {Button} from "@/components/ui/button" 
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
    return(
         <div className="space-y-4">

  {/* BALANCE */}
<Card
  className="
    rounded-3xl
    border-0
    bg-slate-900
    text-white
    shadow-xl
  "
>
  <CardHeader className="pb-2">
    <CardTitle className="text-sm font-medium text-slate-400">
      Current Balance
    </CardTitle>
  </CardHeader>

  <CardContent>
    <div className="flex items-end justify-between">
      <p
        className={`
          text-4xl font-bold tracking-tight
          ${balance >= 0 ? "text-green-400" : "text-red-400"}
        `}
      >
        ${balance}
      </p>

      <div className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
        Updated now
      </div>
    </div>
  </CardContent>
</Card>

  {/* STATS */}
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

    <Card className="rounded-2xl border-0 bg-indigo-50 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        <CardTitle>Total expenses</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-3xl font-bold tracking-tight text-indigo-600">
          ${totalExpances}
        </p>
      </CardContent>
    </Card>

    <Card className="rounded-2xl border-0 bg-indigo-50 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        <CardTitle>This month</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-3xl font-bold tracking-tight text-indigo-600">
          ${totalMonthExpences}
        </p>
      </CardContent>
    </Card>

    <Card className="rounded-2xl border-0 bg-indigo-50 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-3xl font-bold tracking-tight text-indigo-600">
          {categoriesLen}
        </p>
      </CardContent>
    </Card>

    <Card className="rounded-2xl border-0 bg-indigo-50 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        <CardTitle>Total transactions</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-3xl font-bold tracking-tight text-indigo-600">
          {totalTrans}
        </p>
      </CardContent>
    </Card>

  </div>
</div>
    )
}