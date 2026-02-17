"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  const [answer, setAnswer] = useState("");
  const [showPrize, setShowPrize] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const submit = () => {
    if(answer == "A"){
      setShowPrize(true);
    }else{
      setShowFailed(true)
    }
  }

  const prize = "https://link.dana.id/danakaget?c=sukujmcpm&r=buCtAW&orderId=20260217101214715215010300166327564473018";

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {showPrize ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4">
              Klaim hadiahmu di sini
            </h2>
            <p>Terima kasih sudah berpartisipasi dalam quiz gbrs, hadiah hanya untuk 2 orang tercepat</p>
            <Link href={prize} className="bg-blue-400 text-white px-4 py-2">
              Klaim Hadiah
            </Link>
          </div>
        </div>
      ) : null}

      {showFailed ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4">
              Yah, sayang sekali jawaban Anda masih salah
            </h2>
            <p>Terima kasih sudah berpartisipasi dalam quiz gbrs, hadiah hanya untuk 2 orang tercepat</p>
          </div>
        </div>
      ) : null}
      <main className="max-w-sm">
        <p className="text-base text-center text-red-400">
          Semua nama, karakter, maupun kejadian yang muncul di dalam quiz tidak terkait dengan orang nyata, tokoh publik, atau peristiwa nyata apa pun.
        </p>
        <p className="text-base text-center text-red-400">
          Segala kemiripan yang mungkin terjadi bersifat kebetulan dan tidak disengaja.
        </p>
        <h3 className="text-2xl mt-12 mb-18 text-center">
            Apakah membanting piring ketika hari raya idul fitri adalah perbuatan yang tercela?
        </h3>
        
        <div className="flex justify-between flex-col gap-5 text-xl">
          <button className={"border-2 p-5 border-blue-800 hover:bg-blue-800 text-blue-800 hover:text-white cursor-pointer "+ (answer==="A"?"bg-blue-800 text-white":"bg-white")}
            onClick={()=>setAnswer("A")}>
              Ya, hal tersebut adalah perbuatan tercela
          </button>
          <button className={"border-2 p-5 border-blue-800 hover:bg-blue-800 text-blue-800 hover:text-white cursor-pointer "+ (answer==="B"?"bg-blue-800 text-white":"bg-white")}
            onClick={()=>setAnswer("B")}>
              Tidak, hal tersebut adalah perbuatan yang wajar
          </button>

          <button className="border-2 p-5 border-green-800 hover:bg-green-800 text-green-800 hover:text-white cursor-pointer disabled:bg-gray-400 disabled:text-white disabled:border-white"
            disabled={answer==""?true:false}
            onClick={()=>submit()}
          >
            Submit
          </button>

        </div>
      </main>
    </div>
  );
}
