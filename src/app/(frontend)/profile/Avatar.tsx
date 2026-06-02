"use client"
import {useRef, useState} from "react"
import { useRouter } from 'next/navigation'


export default function Avatar ({userEmail, userName, userId, avatarUrl}:{userEmail:string, userName:string, userId:number, avatarUrl:string | null | undefined }){
    const router = useRouter() 
    const fileInputRef = useRef<HTMLInputElement | null>(null)


    function handleCkick(){
        fileInputRef.current?.click()
    }

    async function saveFileName(e:any){
        const formData = new FormData()
        console.log(e.target.files[0])

        formData.append("file", e.target.files[0])
        formData.append("_payload",JSON.stringify({
            "alt": "User avatar"
        }))

        try{
            const res = await fetch("/api/media/", {
                "method":"POST", 
                "body":formData
            })

            const data = await res.json()

            const idMedia = data.doc.id

            console.log("dataaaaaa", data)
            console.log("IDDDDDDDddd", idMedia)

            if(res.ok){
                    const res2 = await fetch(`/api/users/${userId}`, {
                        "method":"PATCH",
                        "headers":{"Content-type":"application/json"},
                        "body":JSON.stringify({"avatar":idMedia})
                    })
                    
                    if(res2.ok){
                        const data2 = await res2.json()
                        console.log("data2222222", data2)
                        e.target.value = ""
                        router.refresh()
                    }
            }

        }
        catch(error){
            console.log(error)
        }



    }

  return (
  <div onClick={handleCkick} className="group relative cursor-pointer">
    <div
      className="
        flex h-30 w-30 items-center justify-center
        overflow-hidden rounded-full
        bg-gradient-to-br from-indigo-500 to-violet-600
        text-lg font-bold text-white
        shadow-lg shadow-indigo-600/30
        transition-all duration-200
        group-hover:scale-105
        group-hover:shadow-xl group-hover:shadow-indigo-500/40
      "
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="User avatar"
          className="h-full w-full object-cover"
        />
      ) : (
        userName?.[0]?.toUpperCase() || userEmail[0].toUpperCase()
      )}
    </div>

    <div
      className="
        absolute -bottom-1 -right-1
        flex h-6 w-6 items-center justify-center
        rounded-full
        border-2 border-slate-950
        bg-slate-800
        text-xs
        transition-colors
        group-hover:bg-indigo-600
      "
    >
      📷
    </div>

    <input
      accept="image/*"
      onChange={saveFileName}
      ref={fileInputRef}
      type="file"
      hidden
    />
  </div>
)
}