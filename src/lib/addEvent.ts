"use server"

import { getPayload } from "payload"
import config from "@/payload.config"
import {getCurrentUserForThisRequest} from "./getCurrentUserForThisRequest"


export async function addEvent(action:string){

    const payload = await getPayload({config})
    const user = await getCurrentUserForThisRequest()


    try{
      const res =  await payload.create(
        {
          collection:'events',
          data:{
            message:action,
            user:user.id
          }
        }
      )
    }
    catch(error){
      console.log(error)
    }

}