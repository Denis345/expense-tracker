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
    icon:string | null,
    createdAt:string,
    updatedAt:string,
    user:number | User
}

export type  Sources = {
    id:number,
    name:string,
    icon:string | null,
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

export type  Incomes = {
    id:number,
    amount:number,
    date:Date,
    category:Sources,
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

export type IncomesS = {
    id:number,
    amount:number,
    date:string,
    categorIncome:number | Sources,
    comment?: string | null,
    createdAt:string,
    updatedAt:string,
    user:number | User

}