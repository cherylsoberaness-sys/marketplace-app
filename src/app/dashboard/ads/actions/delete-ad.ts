"use server"

import { getSession } from "@/lib/auth";
import { z } from 'zod';
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

export type DeleteAdState = {
    status: "idle" | "error";
    message: string;
}

const idSchema = z.coerce.number().int().positive();

export async function deleteAd(adId: number, _previousState: DeleteAdState,
    _formData: FormData): Promise<DeleteAdState> {
    

    const session = await getSession();
    if (!session) {
        return {
            status: 'error',
            message: 'You need to be logged in'
        }
    }

    const parsedId = idSchema.safeParse(adId);

    if (!parsedId.success) {
        return {
            status: 'error',
            message: 'Invalid ad id.'
        }
    }
    

    const ad = await prisma.ad.findUnique({
        where: {
            id: parsedId.data,
        },
        select: {
            id: true,
            ownerId: true
        }
    })

    if (!ad) {
        return { 
            status: 'error',
            message: "Ad not found"
        }
    }

    if (ad.ownerId !== session.userId) {
        return {
            status: 'error',
            message: 'You are not allowed to delete this ad.'
        }
    }

    await prisma.ad.delete({
        where: {
            id: ad.id
        }
    })

    
    revalidatePath("/dashboard");
    redirect("/dashboard");

}