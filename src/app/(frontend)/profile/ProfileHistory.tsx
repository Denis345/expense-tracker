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
    
return (
  <Card className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4 text-[var(--text-primary)] shadow-[var(--shadow-card)]">

    <CardHeader>
      <div className="flex items-start justify-between gap-4">
        <div>
          <CardTitle className="text-lg font-semibold text-[var(--text-primary)]">
            Activity history
          </CardTitle>
          <p className="text-sm text-[var(--text-muted)]">
            Your recent account activity
          </p>
        </div>
      </div>
    </CardHeader>

    <CardContent className="flex flex-col gap-3">
      {activity.docs.map((el) => (
        <div
          key={el.id}
          className="flex items-center justify-between gap-6 rounded-2xl border border-[var(--border)] bg-[var(--secondary-surface)] px-4 py-4 shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--card)] hover:shadow-[var(--shadow-card)]"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/30 text-sm font-bold text-[var(--accent)]">
              •
            </div>

            <div className="min-w-0">
              <p className="break-words text-[12px] min-[512px]:text-sm font-semibold text-[var(--text-primary)]">
                {el.message}
              </p>
            </div>
          </div>

          <div className="max-w-[90px] text-right text-xs font-medium leading-4 text-[var(--text-muted)]">
            {formateDate(el.createdAt)}
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);
}