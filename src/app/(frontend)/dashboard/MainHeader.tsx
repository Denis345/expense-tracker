export default function MainHeader ({userName}:{userName:string}){

return (
  <div className="flex-1">

    {/* Greeting */}
    <p className="text-sm font-medium text-[var(--accent)]">
      Welcome back, {userName}
    </p>

    {/* Main Title */}
    <h3 className="mt-2 text-4xl font-bold tracking-tight text-[var(--text-primary)] lg:text-5xl">
      Finance Overview
    </h3>

    {/* Subtitle */}
    <p className="mt-4 max-w-md text-sm leading-6 text-[var(--text-muted)]">
      Track your expenses, monitor income, and manage your personal finances in one place.
    </p>

  </div>
);
}