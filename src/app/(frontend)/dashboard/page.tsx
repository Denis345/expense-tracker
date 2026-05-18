

import {getCurrentUserForThisRequest} from "@/lib/getCurrentUserForThisRequest"
import { getPayload } from "payload"
import config from '@/payload.config'

import ExpensesOrIncomesList from "./ExpensesOrIncomesList"
import DashboardHeader from './DashboardHeader'
import DashBoardInfo from './DashBoardInfo'

export  default async function Dashboard(){

    const payload = await getPayload({config})
    const user =  await getCurrentUserForThisRequest()
    const userEmail = user.email
 

    const userCategories = await payload.find({
        collection:'categories', 
        limit: 100,
        where:{
            user:{
                equals:user.id
            }
        }
    })

    const userSources = await payload.find({
        collection:'source', 
        limit: 100,
        where:{
            user:{
                equals:user.id
            }
        }
    })

  

    const userExpences = await payload.find({
        collection:'expenses', 
        where:{
            user:{
                equals:user.id
            }
        }, 
        sort:"-date"
    })

    const userIncomes = await payload.find({
        collection:'incomes', 
        where:{
            user:{
                equals:user.id
            }
        }, 
        sort:"-date"
    })

      console.log('-----sssssssss--', userIncomes.docs)

    const totalExpances = userExpences.docs.reduce((acc, expense)=>acc+Number(expense.amount), 0)
    const totalTrans = userExpences.docs.length

    const currentDate = new Date()
    const currentMonth =currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const currentMonthExpenses = userExpences.docs.filter((el)=>{
        const date = new Date(el.date)
        
        const month = date.getMonth()
        const year = date.getFullYear()
        return (month===currentMonth && year===currentYear)
    })

    const totalMonthExpences = currentMonthExpenses.reduce((acc, expense)=>acc+Number(expense.amount), 0)

    console.log('=======_', userCategories.docs)

    const categoriesLen = userCategories.docs.length





return(

    <div className="min-h-screen bg-[#0f172a] px-6 py-10">
        <div className="max-w-5xl mx-auto">
            <div className="rounded-3xl bg-slate-50 p-8 space-y-8 shadow-2xl">

            <DashboardHeader
                userEmail={userEmail}
                categories={userCategories.docs}
                sources={userSources.docs}
            />

            <DashBoardInfo
                totalExpances={Number(totalExpances)}
                categoriesLen={Number(categoriesLen)}
                totalMonthExpences={Number(totalMonthExpences)}
                totalTrans={Number(totalTrans)}
                >
            </DashBoardInfo>

           


            <ExpensesOrIncomesList expances = {userExpences.docs} incomes = {userIncomes.docs}  >

            </ExpensesOrIncomesList>

            </div>
        </div>
    </div>
)
}