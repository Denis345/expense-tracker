"use client"

import {Button} from "@/components/ui/button" 
import { useRouter } from "next/navigation"
import {useState} from "react"
import {addEvent} from "@/lib/addEvent"
import {EVENT_MESSAGES} from "@/constants/eventMessages"

export default  function LogoutButton(){
    const [isLoading, setIsLoading] = useState(false)

     const router = useRouter()
    const logout = async function(){
        setIsLoading(true)
        console.log('LOGOUT')

        try{
            const res = await fetch("/api/users/logout",{
                "method":"POST",
                
            })
        if(res.ok){
                await addEvent(EVENT_MESSAGES.USER_LOGGED_OUT)
                router.push('/login')}
        }
        catch(error){
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
        

    }

    return(

        <Button  disabled={isLoading}
        onClick={logout}
        variant="outline"
        className="h-11 w-18 text-red-300 border-slate-700 bg-slate-900/40  hover:bg-slate-800 hover:text-white"
        >
         {isLoading ? "Logout..." : "Logout"}
        </Button>
    )
}