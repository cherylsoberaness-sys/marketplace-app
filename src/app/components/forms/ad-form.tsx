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
        <form action={formAction} className="grid gap-4 max-w-md">
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" id="title" className="border" />
            {hasTitleError && (
                <div id="title-error" className="text-red-500">
                    {state.fieldErrors.title?.join(", ")}
                </div>
            )}
            <label htmlFor="description">Description:</label>
            <input type="text" name="description" id="description" className="border" />
            {hasDescriptionError && (
                <div id="description-error" className="text-red-500">
                    {state.fieldErrors.description?.join(", ")}
                </div>
            )}
            <label htmlFor="price">Price:</label>
            <input type="text" name="price" id="price" className="border" />
            {hasPriceError && (
                <div id="price-error" className="text-red-500">
                    {state.fieldErrors.price?.join(", ")}
                </div>
            )}
            
            {tagsOptions.map((tag) => (
                <label key={tag} htmlFor={tag}>
                    {tag}
                    <input type="checkbox" name="tags" id={tag} value={tag}  className="border" />
                </label>
            ))}
            
            {hasTagsError && (
                <div id="tags-error" className="text-red-500">
                    {state.fieldErrors.tags?.join(", ")}
                </div>
            )}

            <button type="submit" disabled={isPending}>
                {isPending ? "Creating Ad" : "Create"}
            </button>
            {state.message && <div>{ state.message }</div>}
        </form>
    )
}