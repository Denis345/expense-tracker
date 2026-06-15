import Link from "next/link"

export default function BackDahboardBut(){
    return(
         <Link
          href="/dashboard"
          className="
            inline-flex items-center gap-2
            rounded-2xl
            px-5 py-3
            text-sm font-semibold
            bg-[var(--card)]
            text-[var(--text-primary)]
            border border-[var(--border)]
            shadow-[var(--shadow-soft)]
            transition
            hover:-translate-y-0.5
            hover:bg-[var(--secondary-surface)]
            hover:text-[var(--accent)]
          "
        >
          ← Back to dashboard
        </Link>
    )
}

