import type { CollectionConfig } from "payload";

export const Source : CollectionConfig = {
    slug:"source", 
    access:{
        create:({req})=>Boolean(req.user), 
        read:({req})=>{
            if(!req.user) return false
            if(req.user.role==="admin") return true
            return{
                user:{
                    equals:req.user.id
                }
            }
        }, 
        update:({req})=>{
            if(!req.user) return false

            return{
                user:{
                    equals:req.user.id
                }
            }
        }, 
        delete:({req})=>{
            if(!req.user) return false

            return{
                user:{
                    equals:req.user.id
                }
            }
        }
        
    },
    hooks:{
        beforeChange:[
            ({req, data})=>{
                if(req.user)data.user = req.user.id
                return data
            }
        ]
    },
    admin: {
        useAsTitle: 'name',
    },
    fields:[
        {
            name:"name", 
            type:"text",
            required:true
        }, 
        {
            name:"user", 
            type:"relationship", 
            relationTo:"users", 
            required:true
        },
        {
            name:"icon",
            type:"text",
        }
    ]
}