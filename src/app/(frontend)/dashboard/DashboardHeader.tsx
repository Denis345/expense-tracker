import AddExpenseDialog from './AddExpenseDialog'
import CreateCategoryDialog from './CreateCategoryDialog'

import AddIncomeDialog from './AddIncomeDialog'
import CreateSourceDialog from './CreateSourceDialog'

import MenyButton from './MenyButton'
import Email from './Email'
import MainHeader from './MainHeader'

import LogoutButton from "./LogoutButton"
import type {Categories, Sources} from "./types"


export default function DashboardHeader({userEmail, categories, sources, userName, avatarUrl}:{userEmail:string,categories:Categories[], sources:Sources[],userName:string, avatarUrl:string | null | undefined}){

return (
  <div className="flex flex-col gap-6 rounded-3xl bg-[var(--card)] p-8 shadow-[var(--shadow-card)] border border-[var(--border)] lg:flex-row">

    <MainHeader userName={userName} />

    <div className="flex flex-1 w-full flex-col items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--secondary-surface)] p-4 shadow-[var(--shadow-soft)] lg:w-auto">

      <div className="flex flex-col min-[500px]:flex-row flex-wrap items-center justify-center gap-2">

        <div>
          <Email userEmail={userEmail} avatarUrl={avatarUrl} />
        </div>

        <div className="flex gap-2 justify-end">
          <MenyButton />
          <LogoutButton />
        </div>

      </div>

      <div className="flex w-full flex-col gap-2 lg:flex-row">
        <AddExpenseDialog categories={categories} />
        <AddIncomeDialog sources={sources} />
      </div>

      <div className="flex w-full flex-col gap-2 lg:flex-row lg:justify-end">
        <CreateCategoryDialog />
        <CreateSourceDialog />
      </div>

    </div>
  </div>
);
}