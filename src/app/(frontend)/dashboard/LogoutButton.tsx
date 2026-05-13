"use client"

import {Button} from "@/components/ui/button" 
import { useRouter } from "next/navigation"
import {useState} from "react"

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
            if(res.ok)router.push('/login')
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
        className="border-slate-700 bg-slate-900/40 text-slate-200 hover:bg-slate-800 hover:text-white"
        >
         {isLoading ? "Logout..." : "Logout"}
        </Button>
    )
}