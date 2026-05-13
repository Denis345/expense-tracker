import type { CollectionConfig } from "payload";

export const Expenses:CollectionConfig =  {
    slug:"expenses",
    access:{
        create:  ({req}) =>  Boolean( req.user)  ,
        read:({req})=>{
                if(!req.user)return false
                return {
                    user:{
                        equals:req.user.id
                    }
                }
            },
        update:({req})=>{
            if(!req.user)return false
            return{
                user:{
                    equals:req.user.id
                }
            }
        },
        delete:({req})=>{
            if(!req.user)return false
            return{
                user:{
                    equals:req.user.id
                }
            }
        },

    },
    hooks:{
        beforeChange:[
            ( { req,  data } )=>{
                if(req.user)data.user = req.user.id
                return data
            }
        ]
    },
    fields:[
        {
            name:"amount", 
            type:"number",
            required:true
        },
        {
            name:"date",
            type:"date",
            required:true
        },
        {
            name:"category",
            type:"relationship",
            relationTo:"categories",
            required:true
        },
        {
            name:"comment",
            type:"textarea"
        },
        {
            name:"user",
            type:"relationship",
            relationTo:"users",
            required:true
        }
    ]
}