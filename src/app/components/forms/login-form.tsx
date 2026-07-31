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
        < form action={formAction} >
            <label htmlFor="email">Email:</label>
            <input id="email"  type="email" name="email" className="border" />

            <label htmlFor="password">Password:</label>
            <input id="password" type="password" name="password" className="border" />
            {state.status === "error" && <p>{ state.message}</p>}

            <button type="submit" disabled={isPending}>
                {isPending ? "Logging in..." : "Login"}
            </button>
        </form>
    )
}