import BackDahboardBut from "./BackDahboardBut" 
import ProfileHeader from "./ProfileHeader" 
import ProfileHistory from "./ProfileHistory"
import ProfileDown from "./ProfileDown"

export default async function Profile(){

    return (
  <div className="min-h-screen bg-[#0f172a] px-6 py-10">
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col gap-6 rounded-3xl  bg-slate-300 p-4 shadow-2xl min-[490px]:p-8">
        
        <BackDahboardBut/>

        <ProfileHeader/>

        <ProfileHistory/>

        <ProfileDown/>
      </div>
    </div>
  </div>
)
}