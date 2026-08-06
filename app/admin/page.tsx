"use client"

import { supabase } from "@/lib/supabase/client"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Portfolio = {
  id: string
  title: string
  content: string
  tags: string[]
  company: string
  image_urls: string[]
  video_url: string | null
  created_at: string
}

export default function AdminPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingPortfolios, setIsLoadingPortfolios] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const loadPortfolios = useCallback(async () => {
    if (!supabase) return

    setIsLoadingPortfolios(true)
    const { data, error } = await supabase
      .from("portfolios")
      .select("id, title, content, tags, company, image_urls, video_url, created_at")
      .order("created_at", { ascending: false })

    if (error) {
      setErrorMessage(error.message)
    } else {
      setPortfolios((data ?? []) as Portfolio[])
    }
    setIsLoadingPortfolios(false)
  }, [])

  useEffect(() => {
    const client = supabase
    if (!client) {
      router.replace("/admin/login")
      return
    }

    void client.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/admin/login")
        return
      }

      setEmail(session.user.email ?? "Admin")
      setIsLoading(false)
      void loadPortfolios()
    })
  }, [loadPortfolios, router])

  async function handleDelete(portfolio: Portfolio) {
    if (!supabase) return

    const shouldDelete = window.confirm(`Hapus portofolio “${portfolio.title}”?`)
    if (!shouldDelete) return

    setErrorMessage("")
    setDeletingId(portfolio.id)
    const { error } = await supabase.from("portfolios").delete().eq("id", portfolio.id)
    setDeletingId(null)

    if (error) {
      setErrorMessage(error.message)
      return
    }

    setPortfolios((currentPortfolios) =>
      currentPortfolios.filter((currentPortfolio) => currentPortfolio.id !== portfolio.id)
    )
  }

  async function handleSignOut() {
    if (supabase) await supabase.auth.signOut()
    router.replace("/admin/login")
  }

  if (isLoading) {
    return <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-600">Memuat...</main>
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Kawantara</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">Portfolio admin</h1>
              <p className="mt-2 text-slate-600">Login sebagai {email}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/portfolios/create"
                className="rounded-lg bg-primary px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
              >
                Tambah portofolio
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Keluar
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-900">Daftar portofolio</h2>
            <button
              type="button"
              onClick={() => void loadPortfolios()}
              className="text-sm font-medium text-primary hover:underline"
            >
              Muat ulang
            </button>
          </div>

          {errorMessage && (
            <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          {isLoadingPortfolios ? (
            <p className="mt-6 text-slate-600">Memuat portofolio...</p>
          ) : portfolios.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-8 text-center">
              <p className="text-slate-600">Belum ada portofolio.</p>
              <Link href="/admin/portfolios/create" className="mt-3 inline-block font-medium text-primary hover:underline">
                Buat portofolio pertama
              </Link>
            </div>
          ) : (
            <ul className="mt-6 divide-y divide-slate-200">
              {portfolios.map((portfolio) => (
                <li key={portfolio.id} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-primary">{portfolio.company}</p>
                    <h3 className="mt-1 text-lg font-bold text-slate-900">{portfolio.title}</h3>
                    <p className="mt-2 whitespace-pre-line text-sm text-slate-600">{portfolio.content}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {portfolio.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                      {portfolio.image_urls.map((imageUrl, index) => (
                        <a
                          key={imageUrl}
                          href={imageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline"
                        >
                          Gambar {index + 1}
                        </a>
                      ))}
                      {portfolio.video_url && (
                        <a
                          href={portfolio.video_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline"
                        >
                          Video
                        </a>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => void handleDelete(portfolio)}
                    disabled={deletingId === portfolio.id}
                    className="shrink-0 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === portfolio.id ? "Menghapus..." : "Hapus"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}
