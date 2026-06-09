import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MenyButton(){
    return(
        <div className="flex gap-2 border-red-500">
            
                    <Button
                    asChild
                    title="Profile"
                    variant="ghost"
                    size="icon"
                    className="h-11 w-11 rounded-2xl bg-white/10 text-slate-200 hover:bg-white/15 hover:text-white"
                    >
                    <Link href="/profile">
                        <User className="h-5 w-5" />
                    </Link>
                    </Button>

        
        </div>
    )
}