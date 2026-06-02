"use server"
import {getCurrentUserForThisRequest} from "./getCurrentUserForThisRequest"


export async function addEvent(action:string){

    const userReq = await getCurrentUserForThisRequest()
    const payload = userReq.payload
    const user = userReq.user


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