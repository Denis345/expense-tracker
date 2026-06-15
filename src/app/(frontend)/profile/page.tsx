import TopButtons from "./TopButtons" 
import ProfileHeader from "./ProfileHeader" 
import ProfileHistory from "./ProfileHistory"
import ProfileDown from "./ProfileDown"

export default async function Profile(){

return (
  <div className="min-h-screen bg-[var(--background)] px-6 py-10">
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col gap-6 rounded-3xl bg-[var(--card)] p-4 shadow-[var(--shadow-card)] min-[490px]:p-8">

        {/* Back to Dashboard Button */}
        {/* <BackDahboardBut /> */}
        <TopButtons/>

        {/* Profile Header */}
        <ProfileHeader />

        {/* Profile History */}
        <ProfileHistory />

        {/* Profile Footer / Down section */}
        <ProfileDown />

      </div>
    </div>
  </div>
);
}