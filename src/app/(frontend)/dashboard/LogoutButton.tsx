"use client"

import {Button} from "@/components/ui/button" 
import { useRouter } from "next/navigation"

export default  function LogoutButton(){
     const router = useRouter()
    const logout = async function(){
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
        

    }

    return(

        <Button
        onClick={logout}
        variant="outline"
        className="border-slate-700 bg-slate-900/40 text-slate-200 hover:bg-slate-800 hover:text-white"
        >
        Logout
        </Button>
    )
}