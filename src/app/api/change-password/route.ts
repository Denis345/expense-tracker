import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export async function POST(req:Request){
    const body = await req.json()
    console.log(body)

    const payload = await getPayload({ config })
    const {user} = await payload.auth({
        headers:req.headers
    })

    console.log("CURRENT USER:", user)

    if (!user) {
        return NextResponse.json(
            { message: "Not authenticated" },
            { status: 401 }
        )
    }

    try{
        await payload.login({
            collection:"users",
            data:{
                email:user.email, 
                password: body.oldPassword
            }
        })

        console.log("OLD PASSWORD IS CORRECT")


    }
    catch (error) {
        return NextResponse.json(
            { message: "Old password is incorrect" },
            { status: 400 }
        )
    }

    try{
        await payload.update({
            collection:"users", 
            id:user.id, 
            data:{
                password:body.newPassword
            }
        })

    }
    catch(error){
        
        return NextResponse.json({
            success: false,
            message: "Password changed failed",
        })

    }

 

        return NextResponse.json({
            success: true,
            message: "Password changed successfully",
        })

}