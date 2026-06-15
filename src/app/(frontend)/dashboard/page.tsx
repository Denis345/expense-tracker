

import {getCurrentUserForThisRequest} from "@/lib/getCurrentUserForThisRequest"
import { getPayload } from "payload"
import config from '@/payload.config'

import ExpensesOrIncomesList from "./ExpensesOrIncomesList"
import DashboardHeader from './DashboardHeader'
import DashBoardInfo from './DashBoardInfo'

import { Metadata  } from "next"

export const metadata: Metadata = {
        title: "User Dashboard",
        description:
            "View your expenses, income, balance, and spending statistics in one simple personal finance dashboard.",
        robots:{
            index:false, 
            follow:false
        }
}

export  default async function Dashboard(){

    const payload = await getPayload({config})
    let userReq =  await getCurrentUserForThisRequest()
    const user = userReq.user
    const userEmail = user.email
    const userName = user.name
    const avatarUrl =  typeof(user.avatar)==="number"?  null : user?.avatar?.url
 

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
    const totalIncomes = userIncomes.docs.reduce((acc, income)=>acc+Number(income.amount), 0)

    const balance = totalIncomes-totalExpances

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





return (
  <div className="min-h-screen bg-[var(--background)] px-6 py-10 text-[var(--text-primary)]">
    <div className="max-w-5xl mx-auto">
      <div className="rounded-3xl bg-[var(--card)] p-4 min-[490px]:p-8 space-y-8 shadow-[var(--shadow-card)]">

        {/* Header */}
        <DashboardHeader
          userEmail={userEmail}
          categories={userCategories.docs}
          sources={userSources.docs}
          userName={userName}
          avatarUrl={avatarUrl}
        />

        {/* Info / Stats */}
        <DashBoardInfo
          balance={Number(balance)}
          totalExpances={Number(totalExpances)}
          categoriesLen={Number(categoriesLen)}
          totalMonthExpences={Number(totalMonthExpences)}
          totalTrans={Number(totalTrans)}
        />

        {/* Expenses / Incomes List */}
        <ExpensesOrIncomesList
          expances={userExpences.docs}
          incomes={userIncomes.docs}
        />

      </div>
    </div>
  </div>
);
}