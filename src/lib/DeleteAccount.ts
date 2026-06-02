"use server"

import { cookies } from "next/headers"
import { getCurrentUserForThisRequest } from "./getCurrentUserForThisRequest"
import {redirect} from  "next/navigation"

export async function DeleteAccount(){
        const userReq =  await getCurrentUserForThisRequest()

        const user = userReq.user
        const payload = userReq.payload

        try{

            const res1 = await  payload.delete(
                        {
                            collection: "expenses", 
                            where:{
                                user:{
                                    equals:user.id
                                }
                            }
                        }
                    )

            const res2 = await  payload.delete(
                        {
                            collection: "incomes", 
                            where:{
                                user:{
                                    equals:user.id
                                }
                            }
                        }
                    )

            const res3 = await  payload.delete(
                        {
                            collection: "categories", 
                            where:{
                                user:{
                                    equals:user.id
                                }
                            }
                        }
                    )

            const res4 = await  payload.delete(
                        {
                            collection: "source", 
                            where:{
                                user:{
                                    equals:user.id
                                }
                            }
                        }
                    )

            const res5 = await  payload.delete(
                        {
                            collection: "events", 
                            where:{
                                user:{
                                    equals:user.id
                                }
                            }
                        }
                    )


            const res6 = await  payload.delete(
                        {
                            collection: "users", 
                            where:{
                                id:{
                                    equals:user.id
                                }
                            }
                        }
                    )

        }
        catch(error){
            console.log(error)
            return {
                success: false,
                error: "Failed to delete account",
            }
        }

        const detete = (await cookies()).delete("payload-token")
        console.log("cookies",await cookies() )
        redirect("/login")


}