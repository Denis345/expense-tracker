
"use client"
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

    return (
  <div>

    {/* Delete Account Button */}
    <Button
      onClick={() => setdeleteAcc(true)}
      variant="outline"
      className="
        h-11
        w-auto
        border border-[var(--destructive)]
        bg-[var(--secondary)]
        text-[var(--destructive)]
        hover:bg-[var(--destructive)]
        hover:text-[var(--destructive-foreground)]
        transition-all
      "
    >
      Delete Account
    </Button>

    {/* Delete Account Dialog */}
    <Dialog open={deleteAcc} onOpenChange={setdeleteAcc}>
      <DialogContent className="rounded-2xl bg-[var(--card)] text-[var(--text-primary)] shadow-[var(--shadow-card)] p-6">
        
        <DialogHeader>
          <DialogTitle className="text-[var(--destructive)]">Delete account?</DialogTitle>
          <DialogDescription className="text-[var(--text-muted)]">
            This action cannot be undone. This will permanently delete your
            account and all associated data.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-2 mt-4">

          {/* Cancel Button */}
          <Button
            disabled={isDeleting}
            variant="outline"
            onClick={() => setdeleteAcc(false)}
            className="border border-[var(--border)] bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary-surface)] hover:text-[var(--text-primary)]"
          >
            Cancel
          </Button>

          {/* Delete Button */}
          <Button
            disabled={isDeleting}
            variant="destructive"
            onClick={handleDeleteAccount}
            className="bg-[var(--destructive)] text-[var(--destructive-foreground)] shadow-[var(--shadow-button)] hover:opacity-90"
          >
            {isDeleting ? "Deleting Account..." : "Delete Account"}
          </Button>

        </DialogFooter>

        {/* Error message */}
        {error && (
          <p className="text-sm text-[var(--destructive)] mt-2">{error}</p>
        )}

      </DialogContent>
    </Dialog>

  </div>
);
}