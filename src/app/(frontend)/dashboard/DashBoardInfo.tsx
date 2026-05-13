import {Button} from "@/components/ui/button" 
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type DashboardInfoProps = {
  totalExpances: number
  categoriesLen: number
  totalMonthExpences: number
  totalTrans: number
}

export default function DashBoardInfo({totalExpances, categoriesLen, totalMonthExpences, totalTrans}:DashboardInfoProps){
    return(
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <Card className="rounded-2xl border-0 bg-indigo-50 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                    <CardHeader >
                    <CardTitle>Total expenses</CardTitle>
                    </CardHeader>

                    <CardContent>
                    <p className="text-3xl font-bold tracking-tight text-indigo-600">${totalExpances}</p>
                    </CardContent>
                </Card>



                <Card className="rounded-2xl border-0 bg-indigo-50 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                    <CardHeader>
                    <CardTitle>This month</CardTitle>
                    </CardHeader>

                    <CardContent>
                    <p className="text-3xl font-bold tracking-tight text-indigo-600">${totalMonthExpences}</p>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-0 bg-indigo-50 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                    <CardHeader>
                    <CardTitle>Categories </CardTitle>
                    </CardHeader>

                    <CardContent>
                    <p className="text-3xl font-bold tracking-tight text-indigo-600">{categoriesLen}</p>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-0 bg-indigo-50 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                    <CardHeader>
                    <CardTitle>Total transactions </CardTitle>
                    </CardHeader>

                    <CardContent>
                    <p className="text-3xl font-bold tracking-tight text-indigo-600">{totalTrans}</p>
                    </CardContent>
                </Card>


            </div>
    )
}