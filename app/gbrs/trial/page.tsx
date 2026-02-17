import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <p>
            Apakah membanting piring ketika hari raya idul fitri adalah hal yang tercela?
        </p>
        <button className="border-2 padding-5 border-blue-800 hover:bg-blue-800 text-blue-800 hover:text-white cursor-pointer">
            Ya, hal tersebut adalah perbuatan tercela
        </button>
        <button>
            Tidak, hal tersebut adalah perbuatan yang wajar
        </button>
      </main>
    </div>
  );
}
