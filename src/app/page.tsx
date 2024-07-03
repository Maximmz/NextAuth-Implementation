import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <section className="bg-zinc-200">
    <div className="h-[100vh] max-w-full flex justify-center items-center gap-4">
      <Link href="/register">
    <button className="rounded-xl border-4 p-2 border-slate-600 bg-emerald-400">Register</button>
    </Link>
    <Link href="/login">
      <button className="rounded-xl border-4 p-2 border-slate-600 bg-emerald-400">Login</button>
      </Link>
    </div>
   </section>
  );
}
