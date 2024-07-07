"use client"
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'

const Dashboard = () => {
    const {data: session} = useSession();
  return (
    <>
    {
        session ? (
            <div className="h-[100vh] max-w-full flex flex-col justify-center items-center gap-4 gap-y-2">
            <span className="gap-2 mb-2">
                <h1 className="rounded-xl border-4 border-slate-600 p-2 mb-2">Welcome back, {session?.user?.name}</h1>
                <button onClick={() => signOut()} className="rounded-xl border-4 p-2 border-slate-600 bg-emerald-400 ms-6">Sign out</button>
            </span>
            </div>
        ) :
        (
            <div className="h-[100vh] max-w-full flex flex-col justify-center items-center gap-4">
                <span>Please Login!</span>
             <div>
              <Link href="/api/auth/signin">
              <button onClick={() => signIn("google")} className="rounded-xl border-4 p-2 border-slate-600 bg-emerald-400">Login with Credentials</button>
              </Link>
              </div>
            </div>
        )
    }
    </>
  )
}

export default Dashboard