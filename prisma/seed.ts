import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { DEMO_USERS } from "@/lib/demo-data";
import { hash } from "bcrypt";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
}


const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
})

async function ensureDemoAd(ownerId: number, title: string, description: string, price: number, tags: string[]): Promise<void> {
    const existing = await prisma.ad.findFirst({
        where: {
            ownerId,
            title
        },
        select: { id: true }
    });

    if (existing) {
        await prisma.ad.update({
            where: { id: existing.id },
            data: {
                title,
                description,
                price,
                tags,
                ownerId,
            }
        });

        return;
    }

    await prisma.ad.create({
        data: {
            title,
            description,
            price,
            tags,
            ownerId
        },
    });

}

async function main() {

    for (const user of DEMO_USERS) {
        const hashedPassword = await hash(user.password, 12);

        const seedUser = await prisma.user.upsert({
            where: { email: user.email },
            update: { password: hashedPassword },
            create: {
                email: user.email,
                password: hashedPassword,
            },
            select: { id: true },
        });

        for (const ad of user.ads) {
            await ensureDemoAd(seedUser.id, ad.title, ad.description, ad.price, ad.tags);
        }
    }

    console.log("Data insertion finished");
}


main()
    .then(() => prisma.$disconnect())
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })