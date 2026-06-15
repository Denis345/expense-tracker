
"use client"

import { Sun, Moon } from 'lucide-react'
import {Button} from "@/components/ui/button"
import { useState } from 'react'
import { useRouter } from "next/navigation"


export default function ButtonsComponents({Theme, userId}:{Theme:"light" | "dark", userId:number}){
    const [curTheme, setcurTheme] = useState<"light"  | "dark">(Theme)
    const [clickTheme, setclickTheme] = useState(false)
    const router = useRouter()


    async function hendlClick(theme:"light" | "dark"){
        setcurTheme(theme)
        setclickTheme(true)
        try{
            const res = await fetch(`/api/users/${userId}`, {
                method:"PATCH", 
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(
                    {
                        theme:theme
                    }
                )
            })
            document.documentElement.classList.remove("light", "dark")
            document.documentElement.classList.toggle(theme, true)
            document.cookie = 'theme=dark; Path=/; Max-Age=31536000; SameSite=Lax'
        }
        catch(error){
            console.log(error)
        }
        finally{
            setclickTheme(false)
        }
    }


    return(
    <div className="flex flex-col min-[420px]:flex-row gap-2">
        <Button
            disabled={clickTheme}
            onClick={()=>hendlClick("light")}
            type="button"
            className={`
            h-10
            gap-2
            rounded-xl
            ${curTheme==="light"  ? "bg-[var(--primary)] text-[var(--primary-foreground)]":
                        "bg-[var(--secondary)] text-[var(--secondary-foreground)]"
            }
            shadow-[var(--shadow-button)]
            hover:opacity-90
            `}
            >
            <Sun className="h-4 w-4" />
            light
        </Button>

        <Button
            disabled={clickTheme}
            onClick={()=>hendlClick("dark")}
            type="button"
            className={`
            h-10
            gap-2
            rounded-xl
            ${curTheme==="dark"  ? "bg-[var(--primary)] text-[var(--primary-foreground)]":
                        "bg-[var(--secondary)] text-[var(--secondary-foreground)]"
            }
            shadow-[var(--shadow-button)]
            hover:opacity-90
            `}
            >
            <Moon className="h-4 w-4" />
            dark
        </Button>
    </div>
    )
}