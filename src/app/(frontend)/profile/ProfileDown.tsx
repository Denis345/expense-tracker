

import {Card} from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

import DeleteButton from "./DeleteButton"



export default function  ProfileDown(){
return (
  <Card className="rounded-3xl border border-[var(--destructive)]/30 bg-[var(--secondary-surface)] p-6 text-[var(--text-primary)] shadow-[var(--shadow-card)]">

    <div className="flex flex-col min-[600px]:flex-row items-center justify-between gap-4">

      {/* Icon + text */}
      <div className="flex items-start gap-4">
        <div className="rounded-full border border-[var(--destructive)]/30 p-2">
          <AlertTriangle className="h-5 w-5 text-[var(--destructive)]" />
        </div>

        <div>
          <h3 className="font-semibold text-[var(--destructive)]">
            Danger Zone
          </h3>

          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Permanently delete your account and all associated data.
            <br />
            This action cannot be undone.
          </p>
        </div>
      </div>

      {/* Delete Button */}
      <DeleteButton />

    </div>

  </Card>
);
}