export default function Email ({userEmail, avatarUrl}:{userEmail:string, avatarUrl:string}){
   
    const leftPart = userEmail.split("@")[0]
    const rightPart = userEmail.split("@")[1]
    return(
 
        <div className="flex h-11 items-center gap-2 rounded-full  px-3 text-sm text-slate-300">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full
        bg-gradient-to-br from-indigo-500 to-violet-600
        text-lg font-bold text-white
        shadow-lg shadow-indigo-600/30
        transition-all duration-200
        group-hover:scale-105
        group-hover:shadow-xl group-hover:shadow-indigo-500/40">
                {avatarUrl ? (
                    <img
                    src={avatarUrl}
                    alt="User avatar"
                    className="h-full w-full object-cover"
                    />
                ) : (
                    userEmail[0].toUpperCase()
                )}
                
           
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