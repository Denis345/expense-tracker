export function formateDate(datStr:string){
    const normDate = new Date(datStr)

    const formatter = new Intl.DateTimeFormat("en-En", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })

     const result = formatter.format(normDate)

     return result 
}