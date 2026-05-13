export type User ={
    id:number,
    name:string,
    createdAt:string,
    updatedAt:string,
    email:string

}

export type  Categories = {
    id:number,
    name:string,
    createdAt:string,
    updatedAt:string,
    user:number | User

}

export type  Expences = {
    id:number,
    amount:number,
    date:Date,
    category:Categories,
    comment?: string | null ,
    createdAt:string,
    updatedAt:string,
    user:number | User

}

export type  ExpencesS = {
    id:number,
    amount:number,
    date:string,
    category:number | Categories,
    comment?: string | null,
    createdAt:string,
    updatedAt:string,
    user:number | User

}