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

export default function Source({newUser}:{newUser:Boolean}){
    console.log("newUser --", newUser)
    const [CreateSourceOpen, setCreateSourceOpen] = useState(false)
    const [source, setSource] = useState('')
    const [error, setError] = useState<null | string>(null)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    function openDialog(){
         setCreateSourceOpen(true)
         setError(null)
    }

    function closeDialog() {
    setCreateSourceOpen(false)
    setSource("")
    setError(null)
    }

    async function saveCategory(){
        setIsLoading(true)
        try{
            const res = await fetch("/api/source", {
                method:"POST", 
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    name:source
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
        finally{
            setIsLoading(false)
        }
    }

    return(
        <>
                <Button
                disabled={isLoading}
                onClick={openDialog}
                variant="outline"
                className="
                    w-full justify-center gap-2
                    border-slate-700 bg-slate-900/40 text-slate-200
                    hover:bg-slate-800 hover:text-white
                    lg:w-auto
                "
                >
                Create Source

                {newUser && (
                    <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-medium text-indigo-200">
                    Start here
                    </span>
                )}
                </Button>


            {CreateSourceOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                     <Card className="w-full max-w-md rounded-2xl shadow-xl">
                            <CardHeader>
                            <CardTitle>Add Source</CardTitle>
                            <p className="text-sm text-gray-500">
                                Create income Source.
                            </p>
                            </CardHeader>

                            <CardContent>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                <Label>Name</Label>

                                <Input
                                    onChange={(e) => {
                                    setSource(e.target.value)
                                    setError(null)
                                    }}
                                    name="name"
                                    type="text"
                                    value={source}
                                    placeholder="Salary, Freelance, Investments..."
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

                                <Button disabled={isLoading}  type="button" onClick={saveCategory}>
                                    {isLoading ?"Save source..."  :  "Save source"}
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