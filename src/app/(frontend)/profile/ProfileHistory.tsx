import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {getCurrentUserForThisRequest} from "@/lib/getCurrentUserForThisRequest"
import {formateDate} from "@/lib/formateDate"

export default async function ProfileHistory(){

        const userReq =  await getCurrentUserForThisRequest()

        const user = userReq.user
        const payload = userReq.payload

    
        const activity = await payload.find({
            collection:"events",
            limit:100,
            where:{
                user:{
                    equals:user.id
                }
            },
            sort:"-createdAt"
        })
    
    return(
        <Card className="rounded-3xl border border-slate-800 bg-slate-900 p-4 text-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">
              Activity history
            </CardTitle>

            <p className="text-sm text-slate-400">
              Your recent account activity
            </p>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">
                {activity.docs.map((el) => {
                return (
                    <div
                    key={el.id}
                    className="flex  items-center justify-between gap-6 rounded-2xl border border-slate-200 bg-stone-50 px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white hover:shadow-md"
                    >
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-indigo-300 text-sm font-bold text-indigo-600">
                        •
                        </div>

                        <div className="min-w-0">
                        <p className="break-words text-[12px] min-[512px]:text-sm font-semibold text-slate-900">
                            {el.message}
                        </p>
                        </div>
                    </div>
                        <div className="max-w-[90px] text-right text-xs font-medium leading-4 text-slate-500">
                        {formateDate(el.createdAt)}
                        </div>
                    </div>
                )
                })}
          </CardContent>
        </Card>
    )
}