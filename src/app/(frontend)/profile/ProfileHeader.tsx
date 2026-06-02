import {getCurrentUserForThisRequest} from "@/lib/getCurrentUserForThisRequest"
import {formateDate} from "@/lib/formateDate"
import Avatar from "./Avatar"
// import type { Payload } from 'payload'

export default async function ProfileHeader(){
    const userReq =  await getCurrentUserForThisRequest()
    const user = userReq.user

    console.log('USERRRRRRRr', user)
    const userEmail = user.email
    const userName = user.name
    const timeReg = user.createdAt
    const regData = formateDate(timeReg)
    const userId = user.id
   
    const avatarUrl =  typeof(user.avatar)==="number"?  null : user?.avatar?.url

    console.log("avatarUrl",avatarUrl)
    
    return(
        
        <div className="flex flex-col items-center gap-2 rounded-3xl border border-slate-800 bg-slate-900 p-8 text-white shadow-xl">
           
           <Avatar userEmail={userEmail} userName={userName}  userId={userId} avatarUrl={avatarUrl}/>


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
    )
}