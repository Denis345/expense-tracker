import AddExpenseDialog from './AddExpenseDialog'
import CreateCategoryDialog from './CreateCategoryDialog'

import AddIncomeDialog from './AddIncomeDialog'
import CreateSourceDialog from './CreateSourceDialog'

import MenyButton from './MenyButton'
import Email from './Email'
import MainHeader from './MainHeader'

import LogoutButton from "./LogoutButton"
import type {Categories, Sources} from "./types"


export default function DashboardHeader({userEmail, categories, sources, userName}:{userEmail:string,categories:Categories[], sources:Sources[],userName:string}){

    return(
    <div className="flex flex-col gap-6 rounded-3xl bg-slate-950 p-8 shadow-xl lg:flex-row ">
        <MainHeader  userName={userName}/>

        <div className="flex flex-1 w-full flex-col items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-2xl lg:w-auto ">

            <div className="flex flex-col min-[500px]:flex-row flex-wrap items-center justify-center gap-2">

                <div>
                  <Email userEmail={userEmail}/>
                </div>
                

                <div className="flex gap-2 justify-end">
                  <MenyButton/>
                  <LogoutButton />
                </div>


            </div>


            <div className="flex w-full flex-col gap-2 lg:flex-row ">
                <AddExpenseDialog  categories={categories} />
                <AddIncomeDialog sources={sources} />
            </div>

            <div className="flex w-full flex-col gap-2 lg:flex-row lg:justify-end">
                <CreateCategoryDialog />
                <CreateSourceDialog/>
            </div>


        </div>
    </div>
    )
}