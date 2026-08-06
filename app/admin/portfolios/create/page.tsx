"use client"

import { supabase } from "@/lib/supabase/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"

export default function CreatePortfolioPage() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [company, setCompany] = useState("")
  const [tags, setTags] = useState("")
  const [imageUrls, setImageUrls] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

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

      setIsAuthorized(true)
    })
  }, [router])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase) return

    const tagList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
    const imageUrlList = imageUrls
      .split("\n")
      .map((imageUrl) => imageUrl.trim())
      .filter(Boolean)

    const urlsToValidate = [...imageUrlList, ...(videoUrl.trim() ? [videoUrl.trim()] : [])]
    const invalidUrl = urlsToValidate.find((url) => {
      try {
        new URL(url)
        return false
      } catch {
        return true
      }
    })

    if (invalidUrl) {
      setErrorMessage("Gunakan URL lengkap dan valid untuk gambar atau video.")
      return
    }

    setErrorMessage("")
    setIsSubmitting(true)
    const { error } = await supabase.from("portfolios").insert({
      title: title.trim(),
      content: content.trim(),
      company: company.trim(),
      tags: tagList,
      image_urls: imageUrlList,
      video_url: videoUrl.trim() || null,
    })
    setIsSubmitting(false)

    if (error) {
      setErrorMessage(error.message)
      return
    }

    router.replace("/admin")
  }

  if (!isAuthorized) {
    return <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-600">Memuat...</main>
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <Link href="/admin" className="text-sm font-medium text-primary hover:underline">
          Kembali ke daftar portofolio
        </Link>
        <h1 className="mt-5 text-3xl font-bold text-slate-900">Tambah portofolio</h1>
        <p className="mt-2 text-slate-600">Lengkapi detail proyek yang akan ditampilkan.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700">
            Judul
            <input
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Website eCommerce"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Perusahaan
            <input
              required
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Nama perusahaan atau klien"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Isi portofolio
            <textarea
              required
              rows={5}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Jelaskan tujuan, solusi, dan hasil proyek."
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Tags
            <input
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="website, ecommerce, nextjs"
            />
            <span className="mt-1 block text-xs font-normal text-slate-500">Pisahkan setiap tag dengan koma.</span>
          </label>

          <label className="block text-sm font-medium text-slate-700">
            URL gambar
            <textarea
              rows={4}
              value={imageUrls}
              onChange={(event) => setImageUrls(event.target.value)}
              className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder={"https://example.com/image-1.jpg\nhttps://example.com/image-2.jpg"}
            />
            <span className="mt-1 block text-xs font-normal text-slate-500">Masukkan satu URL gambar per baris.</span>
          </label>

          <label className="block text-sm font-medium text-slate-700">
            URL video (opsional)
            <input
              type="url"
              value={videoUrl}
              onChange={(event) => setVideoUrl(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </label>

          {errorMessage && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          <div className="flex flex-wrap justify-end gap-3 pt-2">
            <Link href="/admin" className="rounded-lg border border-slate-300 px-4 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100">
              Batal
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-primary px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan portofolio"}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
