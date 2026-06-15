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
import {addEvent} from "@/lib/addEvent"
import {EVENT_MESSAGES} from "@/constants/eventMessages"
import {SOURCE_ICONS} from "@/constants/iconSource"

import {
  Folder
} from "lucide-react"

export default function Source(){
   
    const [CreateSourceOpen, setCreateSourceOpen] = useState(false)
    const [source, setSource] = useState('')
    const [error, setError] = useState<null | string>(null)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const  [icon, setIcon] = useState<null | string >(null)

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
                    name:source, 
                    icon
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
                await addEvent(`${EVENT_MESSAGES.SOURCE_CREATED} ${source}`)
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

return (
  <div className="flex-1 h-11">
    <Button
      disabled={isLoading}
      onClick={openDialog}
      className="w-full h-full bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)] hover:bg-slate-800 hover:text-white"
    >
      <Folder className="h-10 w-10" />
      Create Source
    </Button>

    {CreateSourceOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <Card className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-primary)] shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-[var(--text-primary)]">Add Source</CardTitle>
            <p className="text-sm text-[var(--text-muted)]">
              Create income Source.
            </p>
          </CardHeader>

          <CardContent>
            <div className="space-y-5">

              {/* Name */}
              <div className="space-y-2">
                <Label className="text-[var(--text-secondary)]">Name</Label>
                <Input
                  onChange={(e) => {
                    setSource(e.target.value);
                    setError(null);
                  }}
                  name="name"
                  type="text"
                  value={source}
                  placeholder="Salary, Freelance, Investments..."
                  className="w-full rounded-md border border-[var(--border)] bg-[var(--secondary-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:ring-2 focus:ring-[var(--ring)]"
                />
              </div>

              {/* Choose Icon */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-[var(--text-secondary)]">
                  Choose icon
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {SOURCE_ICONS.map((el) => {
                    const isActive = icon === el.icon;
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
                              ? "border-[var(--accent)] bg-[var(--accent)]/10 shadow-[var(--shadow-soft)] ring-2 ring-[var(--accent)]"
                              : "border-[var(--border)] bg-[var(--secondary-surface)] hover:border-[var(--accent)]"
                          }
                        `}
                      >
                        {el.icon}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-md border border-[var(--destructive)]/30 bg-[var(--destructive)]/10 px-3 py-2 text-sm text-[var(--destructive)]">
                  {error}
                </div>
              )}

              {/* Footer Buttons */}
              <div className="flex justify-end gap-2 border-t border-[var(--border)] pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeDialog}
                  className="border border-[var(--border)] bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary-surface)]"
                >
                  Cancel
                </Button>

                <Button
                  disabled={isLoading}
                  type="button"
                  onClick={saveCategory}
                  className="bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[var(--shadow-button)] hover:opacity-90 disabled:opacity-60"
                >
                  {isLoading ? "Save source..." : "Save source"}
                </Button>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    )}
  </div>
);
}