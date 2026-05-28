import type  {CollectionConfig}  from  "payload"

export const Events:CollectionConfig = {
    slug:"events", 
    access:{
        create: ({req})=> Boolean(req.user),
        read:(({req})=>{
            if(!req.user)return false
            if(req.user.role==="admin") return true
            return{
                user:{
                    equals:req.user.id
                }
            }
        }),
        update:({req})=>{
            if(!req.user)return false
            return req.user.role==="admin"
            
        },
        delete:({req})=>{
            if(!req.user)return false
            return req.user.role==="admin"
        },
    },

    hooks:{
        beforeChange:[
            ( { req, data } )=>{

                if(req.user)data.user = req.user.id
                return data
            }
        ]
    },
    fields:[
        {
            name:"message",
            type:'text',
            required:true
        },
        {
            name:"user",
            type:"relationship",
            relationTo:"users",
            required:true
        }
    ]
}