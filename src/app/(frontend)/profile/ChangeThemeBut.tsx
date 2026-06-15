
import {getCurrentUserForThisRequest} from "@/lib/getCurrentUserForThisRequest"
import ButtonsComponents from "./ButtonsComponents"
export default async function ChangeThemeBut(){
    const userReq =  await getCurrentUserForThisRequest()

    const user = userReq.user
    const payload = userReq.payload

    let  Theme = user.theme
    console.log('user theme -  "', Theme)


return (
  <div className="flex flex-row gap-2 rounded-2xl border border-[var(--border)] bg-[var(--secondary-surface)] p-1 shadow-[var(--shadow-soft)]">
    <ButtonsComponents Theme={Theme} userId={user.id}/>
    
  </div>
)
}