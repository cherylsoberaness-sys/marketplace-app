"use server";

import { z } from 'zod';
import prisma from "@/lib/prisma";
import { compare } from 'bcrypt';
import { createSession, destroySession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const loginSchema = z.object({
        email: z.email(),
        password: z.string().min(1)  
})

export type LoginState = { 
    status: "idle" | "error";
    message: string;
}

function safeDashboardPath(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "/dashboard";
  return /^\/dashboard(?:[/?#]|$)/.test(value) ? value : "/dashboard";
}


export async function login(_previousState: LoginState, formData: FormData): Promise<LoginState> {
    
    const result = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    })

    if (!result.success) {
        return { 
            status: "error",
            message: "Invalid Credentials"
        }
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
        where: { email: email }
    })

    if (!user) {
        return { 
            status: "error",
            message: "Invalid Credentials"
        }
    } 

    const isCorrectPassword = await compare(password, user.password);
    if (!isCorrectPassword) {
        return { 
            status: "error",
            message: "Invalid Credentials"
        }
    }

    
    await createSession(user.id);
    redirect(safeDashboardPath(formData.get("from")));
}

export async function logout(): Promise<void> {
    await destroySession();
    redirect("/login");
}