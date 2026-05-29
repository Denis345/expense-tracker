export default function Email ({userEmail}:{userEmail:string}){
   
    const leftPart = userEmail.split("@")[0]
    const rightPart = userEmail.split("@")[1]
    return(
 
        <div className="flex h-11 items-center gap-2 rounded-full  px-3 text-sm text-slate-300">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold leading-none text-white">
                {userEmail[0].toUpperCase()}
            </div>

            <span className="flex items-center  gap-0 ">
            <span className="block text-[18px] max-w-[40px] min-[455px]:max-w-[130px] sm:max-w-[130px] truncate md:max-w-[130px] truncate">
                {leftPart}
            </span>

            <span className="text-[18px]">@{rightPart}</span>
            </span>

        </div>
    
    )
}