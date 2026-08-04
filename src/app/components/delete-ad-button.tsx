"use client"
import { useActionState, useState } from "react"
import { deleteAd, DeleteAdState } from "../dashboard/ads/actions/delete-ad"

type DeleteAdButtonProps = {
    adId: number;
}

const initialState: DeleteAdState = {
    status: "idle",
    message: ""
}


export function DeleteAdButton({ adId }: DeleteAdButtonProps) {
    const deleteAction = deleteAd.bind(null, adId)
    const [state, formAction, isPending] = useActionState(deleteAction, initialState)
    const [showModal, setShowModal] = useState(false);
    
    function openModal() {
        setShowModal(true);
    }
    function closeModal() {
        setShowModal(false);
    }
    
    return (
        <>
            <button onClick={openModal} className="rounded-full border cursor-pointer py-1.5 transition hover hover:bg-gray-200">Delete Ad</button>
            {showModal && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm px-4">
                    <div className="w-full max-w-md flex flex-col items-center gap-6 
                    rounded-2xl border border-dashed bg-background p-8 shadow-2xl text-center">
                        <p className="w-full max-w-md font-semibold tracking-tight">Are you sure you want to delete this ad?</p>
                        <div className="mt-2 flex justify-center gap-4">
                            <button className="cursor-pointer rounded-xl border border-border px-4 py-2" type="button" onClick={closeModal}>Cancel</button>
                            <form action={formAction}>
                                <button className="cursor-pointer rounded-xl bg-red-300 border border-border px-4 py-2" type="submit" disabled={isPending}>{isPending ? "Deleting..." : "Confirm delete"}</button>
                            </form>
                        </div>
                        {state.status === 'error' && <p>{state.message}</p>}
                    </div>
                </div>
            )}
        </>
    );
}