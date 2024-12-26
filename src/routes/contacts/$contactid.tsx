import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useContact } from "../../customHooks/useContact";
import { useState } from "react";
import { DeleteModal } from "../../components/modal";
import { Params } from "../../types";

export const Route = createFileRoute("/contacts/$contactid")({
    component: ContactView,
});

function ContactView() {
    const { contactid }: Params = Route.useParams();
    const { data } = useContact(contactid);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleEdit = () =>
        navigate({
            to: "/contacts/edit/$contactid",
            params: { contactid: contactid },
        });

    const handleDelete = () => {
        setShowModal(true);
    };

    return (
        <>
            <div className="flex gap-6">
                <div className="overflow-hidden rounded-lg w-60 h-60">
                    <img src={data?.image} className="object-cover w-full h-full" />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl">{data?.fullname}</h1>
                            <svg
                                className="w-5 h-5 text-yellow-500 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10 15l-3.5 2.3 1-4.6L2 7.9l4.6-.4L10 2l2.4 5.5 4.6.4-3.5 5.8 1 4.6L10 15z" />
                            </svg>
                        </div>
                        <h4 className="text-xl text-sky-600">{data?.username}</h4>
                    </div>
                    <p>{data?.description}</p>
                    <div className="flex gap-3">
                        <button className="px-3 py-1 border-2 rounded-lg text-sky-600" onClick={handleEdit}>
                            Edit
                        </button>
                        <button className="px-3  py-1 border-2 rounded-lg text-red-600" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            {showModal && <DeleteModal id={contactid} setShowModal={setShowModal} />}
        </>
    );
}
