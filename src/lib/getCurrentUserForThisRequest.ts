import { headers as getHeaders } from "next/headers"
import { redirect } from "next/navigation"
import { getPayload } from "payload"
import config from "@/payload.config"

export async function getCurrentUserForThisRequest() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })

  const { user } = await payload.auth({ headers })

  if (!user) {
    redirect("/login")
  }

  return user
}