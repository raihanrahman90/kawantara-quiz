import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <p>
          Baru jadi 1 halaman bang
        </p>
        <Link href="/gbrs/trial" className="border-red-500 text-red-500 border-2">Link</Link>
      </main>
    </div>
  );
}
