import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MenyButton(){
return (
  <div className="flex-1">

    <Button
      asChild
      title="Profile"
      variant="ghost"
      size="icon"
      className="
        h-11 w-11 rounded-2xl
        bg-[var(--card)]
        text-[var(--text-primary)]
        border border-[var(--border)]
        hover:bg-[var(--secondary-surface)]
        hover:text-[var(--accent)]
        transition-all
      "
    >
      <Link href="/profile">
        <User className="h-5 w-5" />
      </Link>
    </Button>

  </div>
);
}