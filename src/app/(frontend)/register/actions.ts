"use server"

import { getPayload } from "payload"
import config from '@/payload.config'
import {redirect} from  "next/navigation"

export async function registerUser(_prevState:any, FormData:FormData){
  const name = FormData.get("name") as string
  const email = FormData.get("email") as string
  const  password = FormData.get("password") as string

  const payload = await getPayload({config})

  try{
    await payload.create(
      {
        collection:"users",
        data:{
          name,
          email,
          password
        }
      }
    )
  }
  catch(error: any){
    console.log(error?.data?.errors?.[0]?.message)
    return {
        error: error?.data?.errors?.[0]?.message,
        success:null
    }
  }
    
      redirect("/login")
}