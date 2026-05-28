export default function MainHeader ({userName}:{userName:string}){

    return(
 
                  <div className=" flex-1 ">
                    <p className="text-sm font-medium text-indigo-400">
                      Welcome back, {userName}
                    </p>

                    <h3 className="mt-2 text-4xl font-bold tracking-tight text-white lg:text-5xl ">
                      Finance Overview
                    </h3>

                    <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
                      Track your expenses, monitor income, and manage your personal finances in one place.
                    </p>
                  </div>
    
    )
}