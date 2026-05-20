"use server"

import { getPayload } from "payload"
import config from '@/payload.config'
import {redirect} from  "next/navigation"

export async function registerUser(_prevState:any, FormData:FormData){

  const name = FormData.get("name") as string
  const email = FormData.get("email") as string
  const  password = FormData.get("password") as string
  const role = "user"

  async function createDefCtegory(userId:number){
      try{
         const res = await payload.create(
          {
            collection:"categories",
            data:{
              name:"products",
              user:userId
            }
          }
        )
      }
      catch(error){
        console.log(error)
      }

  }

  async function createDefSource(userId:number){
      try{
         const res = await payload.create(
          {
            collection:"source",
            data:{
              name:"salary",
              user:userId
            }
          }
        )
      }
      catch(error){
        console.log(error)
      }

  }

  const payload = await getPayload({config})

  let createdUser
  try{
     createdUser = await payload.create(
      {
        collection:"users",
        data:{
          name,
          email,
          password,
          role
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

    
      await createDefCtegory(createdUser.id)
      await createDefSource(createdUser.id)
      redirect("/login")
}