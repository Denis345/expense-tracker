

import {Card} from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

import DeleteButton from "./DeleteButton"



export default function  ProfileDown(){
    return(
<Card className="border-red-900/50 bg-slate-950">

    <div className="flex items-center justify-between p-6 flex-col min-[600px]:flex-row gap-4">
        
        <div className="flex items-start gap-4">
            <div className="rounded-full border border-red-500/30 p-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>

            <div>
                <h3 className="font-semibold text-red-500">
                Danger Zone
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                Permanently delete your account and all associated data.
                <br />
                This action cannot be undone.
                </p>
            </div>
        </div>

        <DeleteButton/>


    </div>

</Card>
    )
}