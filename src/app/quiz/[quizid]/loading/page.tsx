"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/quiz/fake-results");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-black animate-spin" />
        <div className="text-gray-700">Preparing your results…</div>
      </div>
    </main>
  );
}
