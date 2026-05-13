import {redirect} from  "next/navigation"
import { cookies } from "next/headers"


export async  function getCurrentUserForThisRequest(){
    const cookieStore = await cookies()
    const token = cookieStore.get("payload-token")?.value
    if(!token)redirect('/login')

    const res = await fetch("http://localhost:3000/api/users/me", {
        "headers":{
            Cookie:`payload-token=${token}`
        },
    })
    
    if (!res.ok) redirect("/login")
    const data = await res.json()
    if(!data.user)redirect('/login')
    return data.user
}