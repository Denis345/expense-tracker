"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import {
  LayoutGrid
} from "lucide-react"

import {addEvent} from "@/lib/addEvent"
import {EVENT_MESSAGES} from "@/constants/eventMessages"
import {CATEGORY_ICONS} from "@/constants/iconCategory"

export default function CreateCategoryDialog(){
    const [CreateCategoryOpen, setCreateCategoryOpen] = useState(false)
    const [nameCategory, setNameCategory] = useState('')
    const [error, setError] = useState<null | string>(null)
    const  [icon, setIcon] = useState<null | string >(null)
    const router = useRouter()
     const [isLoading, setIsLoading] = useState(false)

    function openDialog(){
         setCreateCategoryOpen(true)
         setError(null)
    }

    function closeDialog() {
    setCreateCategoryOpen(false)
    setNameCategory("")
    setError(null)
    }

    async function saveCategory(){
        setIsLoading(true)
        try{
            const res = await fetch("/api/categories", {
                method:"POST", 
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    name:nameCategory,
                    icon:icon
                })
            })

            const data =await  res.json()
            console.log('ОБРАБОТКАА ', res.status)
            if(res.status===401  || res.status===403){
                router.push('/login')
                return
            }

            if(res.ok){
                console.log('Add Category success')
                await addEvent(`${EVENT_MESSAGES.CATEGORY_CREATED} ${nameCategory}`)
                router.refresh()
                closeDialog()
                
            }
            else{
                setError(data?.errors?.[0]?.message || "Something went wrong")
            }

        }
        catch(error){
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    return(
        <div className="flex-1   h-11">
                <Button
                disabled={isLoading}
                onClick={openDialog}
                variant="outline"
                className="border-slate-700 w-full h-full bg-slate-900/40 text-slate-200 hover:bg-slate-800 hover:text-white"
                >
                 <LayoutGrid className="h-10 w-10" />   
                Create category
                </Button>


            {CreateCategoryOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                     <Card className="w-full max-w-md rounded-2xl shadow-xl">
                            <CardHeader>
                            <CardTitle>Add category</CardTitle>
                            <p className="text-sm text-gray-500">
                                Create a category to organize your expenses.
                            </p>
                            </CardHeader>

                            <CardContent>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                <Label>Name</Label>

                                <Input
                                    onChange={(e) => {
                                    setNameCategory(e.target.value)
                                    setError(null)
                                    }}
                                    name="name"
                                    type="text"
                                    value={nameCategory}
                                    placeholder="Food, Transport, Health..."
                                />
                                    <div className="space-y-2">
                                    <p className="text-sm font-medium text-slate-700">
                                        Choose icon
                                    </p>

                                    <div className="grid grid-cols-6 gap-2">
                                        {CATEGORY_ICONS.map((el) => {
                                        const isActive = icon === el.icon

                                        return (
                                            <button
                                            key={el.icon}
                                            type="button"
                                            onClick={() => setIcon(el.icon)}
                                            className={`
                                                flex h-8 w-8 items-center justify-center rounded-xl border text-xl
                                                transition-all duration-200
                                                hover:-translate-y-0.5 hover:scale-110 hover:shadow-md

                                                ${
                                                isActive
                                                    ? "border-indigo-500 bg-indigo-50 shadow-md ring-2 ring-indigo-400"
                                                    : "border-slate-200 bg-white hover:border-indigo-200"
                                                }
                                            `}
                                            >
                                            {el.icon}
                                            </button>
                                        )
                                        })}
                                    </div>
                                    </div>
                                </div>

                                {error && (
                                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                                    {error}
                                </div>
                                )}

                                <div className="flex justify-end gap-2 border-t pt-4">
                                <Button type="button" variant="outline" onClick={closeDialog}>
                                    Cancel
                                </Button>

                                <Button disabled={isLoading}  type="button" onClick={saveCategory}>
                                    {isLoading ?"Save category..."  :  "Save category"}
                                </Button>
                                </div>
                            </div>
                            </CardContent>
              
                     </Card>
                </div>
            )}
        </div>
    )
}