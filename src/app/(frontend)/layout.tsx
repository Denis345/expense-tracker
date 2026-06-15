import React from 'react'
import './styles.css'

import {getCurrentUserForThisRequest} from "@/lib/getCurrentUserForThisRequest"
import { cookies } from 'next/headers'


export const metadata = {
  description: "Track your expenses and manage categories easily.",
  title: 'Personal Finance Tracker',
  
  openGraph: {
    title: "Personal Finance Tracker",
    description: "Track your expenses and manage categories easily.",
    url: "https://expense-tracker-beta-silk.vercel.app",
    siteName: "Personal Finance Tracker",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Personal Finance Tracker dashboard",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Personal Finance Tracker",
    description: "Track your expenses and manage categories easily.",
    images: ["/og-image.png"],
  },

  alternates: {
    canonical: "https://expense-tracker-beta-silk.vercel.app",
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {

  type Theme = "light" | "dark"

  function normalizeTheme(value: string | undefined): Theme {
    return value === "dark" ? "dark" : "light"
  }
    const cookieStore  = await cookies()
    const themeCookie  = cookieStore.get('theme')?.value
    const  theme =  normalizeTheme(themeCookie)

  const { children } = props

  return (
    <html lang="en" className={theme==="dark"? "dark": ""}>
    {/* <html lang="en"> */}
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
