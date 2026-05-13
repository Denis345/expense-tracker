import { headers as getHeaders } from "next/headers"
import { getPayload } from "payload"
import config from "@/payload.config"
import Link from "next/link"

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { user } = await payload.auth({ headers })

  return (
    <main className="min-h-screen bg-[#0f172a] px-6 py-10">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center">
        <div className="w-full rounded-[32px] bg-slate-50 p-8 shadow-2xl lg:p-14">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            
            {/* LEFT */}
            <div>
              <div className="mb-4 inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
                Personal Finance Tracker
              </div>

              <h1 className="text-5xl font-bold tracking-tight text-slate-950 lg:text-6xl">
                Track your expenses with clarity
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Organize your spending, manage categories, and keep your
                personal finances under control with a clean modern dashboard.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {!user ? (
                  <>
                    <Link
                      href="/register"
                      className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-indigo-500"
                    >
                      Create account
                    </Link>

                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-slate-100 px-6 py-3 text-sm font-semibold !text-slate-900 shadow-sm transition hover:bg-slate-200"
                  >
                    Login
                  </Link>
                  </>
                ) : (
                  <Link
                    href="/dashboard"
                    className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-indigo-500"
                  >
                    Go to dashboard
                  </Link>
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <div className="rounded-3xl bg-slate-950 p-6 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-indigo-50 p-5">
                    <p className="text-sm text-slate-500">Total expenses</p>

                    <p className="mt-2 text-3xl font-bold text-indigo-600">
                      $12,450
                    </p>
                  </div>

                  <div className="rounded-2xl bg-emerald-50 p-5">
                    <p className="text-sm text-slate-500">Categories</p>

                    <p className="mt-2 text-3xl font-bold text-emerald-600">
                      12
                    </p>
                  </div>

                  <div className="col-span-2 rounded-2xl bg-white p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold text-slate-900">
                          Starbucks
                        </p>

                        <p className="text-sm text-slate-500">
                          Food & Drinks
                        </p>
                      </div>

                      <p className="text-lg font-bold text-slate-950">
                        -$14
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold text-slate-900">
                          Uber
                        </p>

                        <p className="text-sm text-slate-500">
                          Transportation
                        </p>
                      </div>

                      <p className="text-lg font-bold text-slate-950">
                        -$32
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-xl">
                <p className="text-sm text-slate-500">
                  This month spending
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-950">
                  $4,210
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}