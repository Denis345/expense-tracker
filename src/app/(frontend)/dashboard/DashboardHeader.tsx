import AddExpenseDialog from './AddExpenseDialog'
import CreateCategoryDialog from './CreateCategoryDialog'

import AddIncomeDialog from './AddIncomeDialog'
import CreateSourceDialog from './CreateSourceDialog'

import LogoutButton from "./LogoutButton"
import type {Categories, Sources} from "./types"

export default function DashboardHeader({userEmail, categories, sources, userName}:{userEmail:string,categories:Categories[], sources:Sources[],userName:string}){
    return(
            <div className="flex flex-col gap-6 rounded-3xl bg-slate-950 p-8 shadow-xl lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-400">
                      Welcome back, {userName}
                    </p>

                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-white lg:text-5xl">
                      Finance Overview
                    </h1>

                    <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
                      Track your expenses, monitor income, and manage your personal finances in one place.
                    </p>
                  </div>

              <div className="flex w-full flex-col items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-2xl lg:w-auto lg:items-end">
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <div className="flex h-8 items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-3 text-sm text-slate-300">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold leading-none text-white">
                          {userEmail[0].toUpperCase()}
                        </div>

                        <span className="max-w-[220px] truncate">
                          {userEmail}
                        </span>
                      </div>

                      <LogoutButton />
                    </div>



                  <div className="flex w-full flex-col gap-2 lg:flex-row lg:justify-end">
                    <AddExpenseDialog categories={categories} />
                    <AddIncomeDialog sources={sources} />
                  </div>

                  <div className="flex w-full flex-col gap-2 lg:flex-row lg:justify-end">
                    <CreateCategoryDialog />
                    <CreateSourceDialog newUser={sources.length===0} />
                  </div>


             </div>
            </div>
    )
}