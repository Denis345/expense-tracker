import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access:{
    admin:({req})=>req.user?.role === "admin",
    read:({req})=>{
      if (!req.user) return false

      if(req.user.role === "admin") return true

      return {
        id:{
          equals: req.user.id
        }
      }
    }
  },
  fields: [
      {
        name:"name",
        type:"text",
        required:true
      },
      {
        name:"role", 
        type:"select", 
        required: true,
        defaultValue:"user", 
        access:{
          create: ({req})=>req.user?.role === "admin",
          update: ({req})=>req.user?.role === "admin"
        },
        options:[
          {
            label:"User", 
            value:"user"
          },
          {
            label:"Admin",
            value:"admin",
          }

        ]
      }
  ],
}
