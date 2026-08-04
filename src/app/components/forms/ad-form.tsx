"use client";
import { AdActionState, createAd} from "@/app/dashboard/ads/actions/create-ad";
import { useActionState } from "react";

const initialState: AdActionState  = {
    status: 'idle',
    message: '',    fieldErrors: {}
}

const tagsOptions = ['tech', 'home', 'sports', 'gaming', 'furniture'];

export function AdForm() {
    const [state, formAction, isPending] = useActionState(createAd, initialState);

    const hasTitleError = Boolean(state.fieldErrors.title?.length);
    const hasDescriptionError = Boolean(state.fieldErrors.description?.length);
    const hasPriceError = Boolean(state.fieldErrors.price?.length);
    const hasTagsError = Boolean(state.fieldErrors.tags?.length);

    return (
        <form action={formAction} className="flex flex-col min-h-120 w-100 rounded-2xl border border-dashed border-zinc-300 bg-[#f7f7f3]
            p-6 shadow-sm">
            <div className="flex flex-col gap-2">
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" id="title" className="rounded-lg border px-4 py-2
                    focus:outline-none transition-colors focus:bg-gray-200" />
                <div className="min-h-5">
                    {hasTitleError && (
                        <div id="title-error" className="text-sm text-red-500">
                            {state.fieldErrors.title?.join(", ")}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" id="description" className="rounded-lg border px-4 py-2
                    transition-colors focus:bg-gray-200 focus:outline-none"/>
                <div className="min-h-5">
                    {hasDescriptionError && (
                        <div id="description-error" className="text-sm text-red-500">
                            {state.fieldErrors.description?.join(", ")}
                        </div>
                    )}
                </div>
            </div>    
            <div className="flex flex-col gap-2">
                <label htmlFor="price">Price:</label>
                <input type="text" name="price" id="price" className="rounded-lg border px-4 py-2
                    focus:outline-none transition-colors focus:bg-gray-200" />
                <div className="min-h-5">
                    {hasPriceError && (
                        <div id="price-error" className="text-sm text-red-500">
                            {state.fieldErrors.price?.join(", ")}
                        </div>
                    )}
                </div>
            </div>
            <div>
                <div className="flex flex-wrap gap-3 mt-1">
                    {tagsOptions.map((tag) => (
                        <label key={tag} htmlFor={tag} className="flex cursor-pointer gap-2 text-m">
                            {tag}
                            <input type="checkbox" name="tags" id={tag} value={tag}  className="border" />
                        </label>
                    ))}
                </div>
                <div className="min-h-5">
                    {hasTagsError && (
                        <div id="tags-error" className="text-sm text-red-500">
                            {state.fieldErrors.tags?.join(", ")}
                        </div>
                    )}
                </div>
            </div>
            <button type="submit" disabled={isPending} className="rounded-lg border cursor-pointer py-1.5 transition hover hover:bg-gray-200">
                {isPending ? "Creating Ad" : "Create"}
            </button>
            {state.message && <p className="text-sm text-center text-red-500 mt-1">{ state.message }</p>}
        </form>
    )
}