import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock external modules
vi.mock("@/lib/auth", () => ({
    getSession: vi.fn(),
}))

vi.mock("@/lib/prisma", () => ({
    default: {
        ad: {
            create: vi.fn(),
        },
    },
}));

vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

// Mocked imports
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// function to test
import { AdActionState, createAd } from "../actions/create-ad";

// Typed access to mocked functions
const sessionMock = vi.mocked(getSession);
const createMock = vi.mocked(prisma.ad.create);
const revalidatePathMock = vi.mocked(revalidatePath);
const redirectMock = vi.mocked(redirect);

const initialState: AdActionState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

function formData(values: Record<string, string | string[]>) {
    const data = new FormData();

    for (const [key, value] of Object.entries(values)) {
        if (Array.isArray(value)) {
            value.forEach(item => data.append(key, item));
        } else {
            data.set(key, value)
        }
    }
    return data;
}

describe("createAd", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        sessionMock.mockResolvedValue({
            userId: 2,
        });
    });

    it("returns validation errors without writing, revalidating or redirecting", async () => {
        const result = await createAd(
            initialState,
            formData({
                title: "ab",
                description: "short",
                price: "-1",
                tags: [""]
            }),
        );

        expect(sessionMock).toHaveBeenCalled();

        expect(result).toMatchObject({
            status: "error",
            message: "check indicated fields"
        });
        expect(result.fieldErrors.title).toBeDefined();
        expect(result.fieldErrors.description).toBeDefined();
        expect(result.fieldErrors.price).toBeDefined();
        expect(result.fieldErrors.tags).toBeDefined();
        expect(createMock).not.toHaveBeenCalled();
        expect(revalidatePathMock).not.toHaveBeenCalled();
        expect(redirectMock).not.toHaveBeenCalled();
    });

    it("creates the ad with the session, revalidates the dashboard and redirects", async () => {
        await createAd(
            initialState,
            formData({
                title: "Earphones HAY",
                description: "Noise cancellation",
                price: "100",
                tags: []
            })
        );

        expect(sessionMock).toHaveBeenCalled();

        expect(createMock).toHaveBeenCalledWith({
            data: {
                title: "Earphones HAY",
                description: "Noise cancellation",
                price: 100,
                tags: [],
                ownerId: 2,
            },
        });

        expect(revalidatePathMock).toHaveBeenCalledWith("/dashboard");
        expect(redirectMock).toHaveBeenCalledWith("/dashboard")
    });
});

