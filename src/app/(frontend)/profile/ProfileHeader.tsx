import {getCurrentUserForThisRequest} from "@/lib/getCurrentUserForThisRequest"
import {formateDate} from "@/lib/formateDate"
import Avatar from "./Avatar"

import ChangePassButton from "./ChangePassButton"

export default async function ProfileHeader(){
    const userReq =  await getCurrentUserForThisRequest()
    const user = userReq.user

    console.log('USERRRRRRRr', user)
    const userEmail = user.email
    const userName = user.name
    const timeReg = user.createdAt
    const regData = formateDate(timeReg)
    const userId = user.id
   
    const avatarUrl =  typeof(user.avatar)==="number"?  null : user?.avatar?.url

    console.log("avatarUrl",avatarUrl)
    
return (
  <div className="flex flex-col items-center gap-2 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 text-[var(--text-primary)] shadow-[var(--shadow-card)]">

    {/* Аватар */}
    <Avatar
      userEmail={userEmail}
      userName={userName}
      userId={userId}
      avatarUrl={avatarUrl}
    />

    {/* Имя пользователя */}
    <div className="mt-2 text-base font-semibold text-[var(--text-primary)]">
      {userName}
    </div>

    {/* Email */}
    <div className="text-sm text-[var(--text-secondary)]">
      {userEmail}
    </div>

    {/* Дата регистрации */}
    <div className="text-sm text-[var(--text-muted)]">
      Member since {regData}
    </div>

    {/* Кнопка смены пароля */}
    <ChangePassButton />

  </div>
);
}