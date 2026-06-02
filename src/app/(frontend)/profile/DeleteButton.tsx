
"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"


import { Button } from "@/components/ui/button"
import {DeleteAccount} from  "@/lib/DeleteAccount"
import { useState } from "react"

export default function DeleteButton(){
    const [deleteAcc, setdeleteAcc] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleDeleteAccount(){

        try{
            setIsDeleting(true)
            setError(null)
            await DeleteAccount()
        }
        catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            }
        }
        finally{
             setIsDeleting(false)
        }
        


    }

    return(
        <div>
            <Button
                onClick={()=>setdeleteAcc(true)}
                variant="outline"
                className="border-red-500 text-red-500 bg-slate-950 hover:bg-red-600"
                >
                Delete Account
            </Button>

            <Dialog open={deleteAcc} onOpenChange={setdeleteAcc}>
                    <DialogContent className="rounded-2xl">
                        <DialogHeader>
                                <DialogTitle className="text-red-500">
                                    Delete account?
                                </DialogTitle>

                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and all associated data.
                                </DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                            <Button
                                disabled={isDeleting}
                                variant="outline"
                                onClick={() => setdeleteAcc(false)}
                            >
                                Cancel
                            </Button>

                        <Button
                            disabled={isDeleting}
                            variant="destructive"
                            onClick={handleDeleteAccount}
                        >
                            {isDeleting? ( "Deleting Account..."): " Delete Account"}
                           
                        </Button>

                        {error && (
                            <p className="text-sm text-red-500">
                            {error}
                            </p>
                        )}

                        </DialogFooter>
                    </DialogContent>

            </Dialog>

        </div>

    )
}