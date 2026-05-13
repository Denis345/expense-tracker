import AddExpenseDialog from './AddExpenseDialog'
import CreateCategoryDialog from './CreateCategoryDialog'
import LogoutButton from "./LogoutButton"
import type {Categories} from "./types"

export default function DashboardHeader({userEmail, categories}:{userEmail:string,categories:Categories[]}){
    return(
            <div className="flex flex-col gap-6 rounded-3xl bg-slate-950 p-8 shadow-xl lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <h1 className="text-white text-4xl font-bold tracking-tight">
                    Finance Overview
                    </h1>

                    <p className="mt-4 text-slate-400 text-sm">
                    Track your expenses and manage categories
                    </p>
                </div>

            <div className="
            flex flex-col items-end gap-3
            rounded-2xl
            border border-white/15
            bg-white/10
            p-4
            shadow-2xl
            ">
                <div className="flex flex-wrap items-center justify-end gap-2">
                    <div className="flex h-8 items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 text-sm text-slate-300">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold leading-none text-white">
                            {userEmail[0].toUpperCase()}
                        </div>

                        <span className="max-w-[220px] truncate">
                            {userEmail}
                        </span>
                    </div>

                    <LogoutButton />
                </div>

                    <div className="flex flex-wrap justify-end gap-2">
                        <AddExpenseDialog categories={categories} />
                        <CreateCategoryDialog />
                    </div>
            </div>
            </div>
    )
}