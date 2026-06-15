export default function Email ({userEmail, avatarUrl}:{userEmail:string, avatarUrl:string | null | undefined}){
   
    const leftPart = userEmail.split("@")[0]
    const rightPart = userEmail.split("@")[1]
  return (
  <div className="flex h-11 items-center gap-2 rounded-full px-3 text-sm text-[var(--text-primary)]">

    {/* Аватарка */}
    <div
      className="
        flex h-11 w-11 items-center justify-center overflow-hidden rounded-full
        bg-gradient-to-br from-[var(--accent)] to-[var(--primary)]
        text-lg font-bold text-[var(--card-foreground)]
        shadow-lg shadow-[var(--shadow-soft)]
        transition-all duration-200
        group-hover:scale-105
        group-hover:shadow-xl group-hover:shadow-[var(--shadow-card)]
      "
    >
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

    {/* Email / Left + Right */}
    <span className="flex items-center gap-0">
      <span className="block text-[18px] max-w-[40px] min-[455px]:max-w-[130px] sm:max-w-[130px] truncate md:max-w-[130px] truncate">
        {leftPart}
      </span>

      <span className="text-[18px]">@{rightPart}</span>
    </span>
    
  </div>
);
}