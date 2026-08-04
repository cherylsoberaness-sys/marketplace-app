"use client";
import { useActionState } from "react";
import { login, LoginState } from "@/app/login/actions";



const initialState: LoginState = {
    status: "idle",
    message: ""
}


export function LoginForm() {
    const [state, formAction, isPending] = useActionState(login, initialState)
    
    return (
        <form action={formAction} className="flex flex-col min-h-50 w-100 rounded-2xl border border-dashed border-zinc-300 bg-[#f7f7f3]
            p-6 shadow-sm space-y-4">
            <div className="flex flex-row gap-4">
                <label htmlFor="email" className="w-24">Email:</label>
                <input id="email"  type="email" name="email" className="flex-1 rounded-lg border px-4 py-2
                focus:outline-none transition-colors focus:bg-blue-100" /> 
            </div>
            <div className="flex flex-row gap-4">
                <label htmlFor="password" className="w-24">Password:</label>
                <input id="password" type="password" name="password" className="flex-1 rounded-lg border px-4 py-2
                focus:outline-none transition-colors focus:bg-blue-100" />
            </div>
            
            {state.status === "error" && <p className="text-center text-sm text-red-500">{ state.message}</p>}
            <button type="submit" disabled={isPending} className="rounded-lg border cursor-pointer py-1.5 transition hover hover:bg-gray-200">
                {isPending ? "Logging in..." : "Login"}
            </button>
        </form>
    )
}