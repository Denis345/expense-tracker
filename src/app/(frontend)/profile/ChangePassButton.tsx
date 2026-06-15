"use client"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Lock} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {addEvent} from "@/lib/addEvent"
import {useState} from "react"
import { useRouter } from 'next/navigation'

export default function ChangePassButton(){
    const [ChangeDialog, setChangeDialog] = useState(false)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState<null | string>(null)
    const [saving, setSaving] = useState(false)

    const router = useRouter() 

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        setError(null)
        setSaving(true)
        console.log("CHANGGGIIIINS")
        if (newPassword!==confirmPassword){
            setError("Passwords do not match")
            setSaving(false)
            return
        }
        if (oldPassword===confirmPassword){
            setError("The new password must be different from the old password!")
            setSaving(false)
            return
        }

        try{

            const res = await fetch("/api/change-password", {
                "method":"POST", 
                "headers":{"Content-type":"application/json"},
                "body":JSON.stringify({
                    oldPassword, 
                    newPassword
                })
             })

            const data = await res.json()
             if(!res.ok){
                setError(data.message)
                setSaving(false)
             }
             else{
                closeChange()
                addEvent("Change Password")
                router.refresh()
             }

        }
        catch(error){
            console.log(error)

        }
    }

    function closeChange(){
            setError(null)
            setChangeDialog(false)
            setOldPassword("")
            setNewPassword("")
            setConfirmPassword("")
            setSaving(false)
    }

return (
  <div>

    {/* Button to open dialog */}
    <Button
      className="
        h-11
        w-auto
        flex items-center gap-2
        border border-[var(--border)]
        bg-[var(--secondary)]
        text-[var(--accent)]
        hover:bg-[var(--secondary-surface)]
        hover:text-[var(--text-primary)]
        transition-all
      "
      onClick={() => setChangeDialog(true)}
    >
      <Lock className="h-4 w-4" />
      Change Password
    </Button>

    {/* Dialog */}
    <Dialog
      open={ChangeDialog}
      onOpenChange={(open) => {
        setChangeDialog(open);
        if (!open) closeChange();
      }}
    >
      <DialogContent className="bg-[var(--card)] text-[var(--text-primary)] shadow-[var(--shadow-card)] rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-[var(--text-primary)]">Change Password</DialogTitle>
          <DialogDescription className="text-[var(--text-muted)]">
            Enter data below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <Input
            type="text"
            placeholder="Old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="border border-[var(--border)] bg-[var(--secondary-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:ring-2 focus:ring-[var(--ring)]"
          />

          <Input
            type="text"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-[var(--border)] bg-[var(--secondary-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:ring-2 focus:ring-[var(--ring)]"
          />

          <Input
            type="text"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-[var(--border)] bg-[var(--secondary-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:ring-2 focus:ring-[var(--ring)]"
          />

          {error && (
            <p className="text-sm text-[var(--destructive)]">{error}</p>
          )}

          <DialogFooter className="flex justify-end gap-2">
            <Button
              disabled={saving}
              type="submit"
              variant="outline"
              className="border border-[var(--border)] bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary-surface)] hover:text-[var(--text-primary)]"
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>

  </div>
);
}