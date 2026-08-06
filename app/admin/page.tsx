"use client"

import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AdminPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      router.replace("/admin/login")
      return
    }

    void supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/admin/login")
        return
      }

      setEmail(session.user.email ?? "Admin")
      setIsLoading(false)
    })
  }, [router])

  async function handleSignOut() {
    if (supabase) await supabase.auth.signOut()
    router.replace("/admin/login")
  }

  if (isLoading) {
    return <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-600">Memuat...</main>
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Kawantara</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Admin dashboard</h1>
            <p className="mt-2 text-slate-600">Login sebagai {email}</p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Keluar
          </button>
        </div>
      </section>
    </main>
  )
}
