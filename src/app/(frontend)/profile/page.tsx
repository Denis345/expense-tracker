import {getCurrentUserForThisRequest} from "@/lib/getCurrentUserForThisRequest"
import { getPayload } from "payload"
import config from '@/payload.config'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from "next/link"

function formateDate(datStr:string){
    const normDate = new Date(datStr)

    const formatter = new Intl.DateTimeFormat("en-En", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })

     const result = formatter.format(normDate)

     return result 
}


export default async function Profile(){
    const payload = await getPayload({config})
    const user =  await getCurrentUserForThisRequest()
    const userEmail = user.email
    const userName = user.name
    const timeReg = user.createdAt



   

    const regData = formateDate(timeReg)

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

    console.log(activity.docs)

    

    
    return (
  <div className="min-h-screen bg-[#0f172a] px-6 py-10">
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col gap-6 rounded-3xl  bg-slate-300 p-4 shadow-2xl min-[490px]:p-8">
        <div className="flex justify-start">
            <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
            >
                ← Back to dashboard
            </Link>
        </div>  

        <div className="flex flex-col items-center gap-2 rounded-3xl border border-slate-800 bg-slate-900 p-8 text-white shadow-xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold leading-none text-white shadow-lg shadow-indigo-600/30">
            {userEmail[0].toUpperCase()}
          </div>

          <div className="mt-2 text-base font-semibold text-white">
            {userName}
          </div>

          <div className="text-sm text-slate-400">
            {userEmail}
          </div>

          <div className="text-sm text-slate-500">
            Member since {regData}
          </div>
        </div>

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

      </div>
    </div>
  </div>
)
}