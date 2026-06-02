
import Link from "next/link"


export default function BackDahboardBut(){
    return(
            <div className="flex justify-start">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
                >
                    ← Back to dashboard
                </Link>
        </div> 
    )
}