"use server"

import { getSession } from '@/lib/auth';
import prisma from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'
import { z } from 'zod';


export type AdActionState = {
    status: 'idle' | 'error' | 'success';
    message: string;
    fieldErrors: {
        title?: string[];
        description?: string[]
        price?: string[]
        tags?: string[]
    }
}

const createAdSchema = z.object({
    title: z.string().trim().min(3, "title needs at least 3 chars").max(80, 'Title cant have over 80 chars'),
    description: z.string().trim().min(10, "Description needs at least 10 chars").max(500, "Description cant have over 500 chars"),
    price: z.coerce.number().min(0, "Price cannot be negative"),
    tags: z.array(z.string().trim().min(3))
});


export async function createAd(_previousState: AdActionState, formData: FormData):
    Promise<AdActionState> {
    
    const session = await getSession();

    if (!session) {
        return {
            status: 'error',
            message: 'You need a valid session to create an ad',
            fieldErrors: {},
        }
    }

    const result = createAdSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        price: formData.get("price"),
        tags: formData.getAll("tags")
    });

    if (!result.success) {
        return {
            status: "error",
            message: "check indicated fields",
            fieldErrors: z.flattenError(result.error).fieldErrors
        }
    }

    await prisma.ad.create({
        data: {
            ...result.data,
            ownerId: session.userId
        }
    });

    revalidatePath("/dashboard");
    redirect("/dashboard")

}