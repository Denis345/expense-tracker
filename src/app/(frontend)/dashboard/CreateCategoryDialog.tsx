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

export default function CreateCategoryDialog(){
    const [CreateCategoryOpen, setCreateCategoryOpen] = useState(false)
    const [nameCategory, setNameCategory] = useState('')
    const [error, setError] = useState<null | string>(null)
    const router = useRouter()

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
        try{
            const res = await fetch("/api/categories", {
                method:"POST", 
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    name:nameCategory
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
    }

    return(
        <>
                <Button
                onClick={openDialog}
                variant="outline"
                className="border-slate-700 bg-slate-900/40 text-slate-200 hover:bg-slate-800 hover:text-white"
                >
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

                                <Button type="button" onClick={saveCategory}>
                                    Save category
                                </Button>
                                </div>
                            </div>
                            </CardContent>
              
                     </Card>
                </div>
            )}
        </>
    )
}