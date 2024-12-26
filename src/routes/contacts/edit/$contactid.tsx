import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { userSchema } from "../../../utils/schema";
import { FieldInfo } from "../../../utils/util";
import { uploadWithJSON } from "../../../utils/helpfunctions";
import { useEditContact } from "../../../customHooks/useEditContact";
import { ChangeEvent, FormEvent, useState } from "react";
import { IContact, Params, User } from "../../../types";
import { useContact } from "../../../customHooks/useContact";

export const Route = createFileRoute("/contacts/edit/$contactid")({
    component: ContactEdit,
});

function ContactEdit() {
    const { contactid }: Params = Route.useParams();
    const { mutate } = useEditContact();
    const [imageSrc, setImageSrc] = useState<string>("");
    const { data } = useContact(contactid);

    const handleEditSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const image = form.image.files[0] ? await uploadWithJSON(form.image.files[0]) : "";

        const editData: Omit<IContact, "id"> = {
            image: image ? `${image}` : data.image,
            fullname: form.fullname.value,
            username: form.username.value,
            description: form.description.value,
        };
        mutate({ id: contactid, contactItem: editData });
    };

    const form = useForm({
        defaultValues: {
            fullname: data?.fullname,
            username: data?.username,
            description: data?.description,
        } as User,
        validators: {
            onChange: userSchema,
        },
    });
    const handleChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length) {
            const imageBase64 = await uploadWithJSON(files[0]);
            setImageSrc(`${imageBase64}`);
        }
    };

    return (
        <>
            {data && (
                <form onSubmit={handleEditSubmit}>
                    <div className="flex flex-col gap-6 w-content w-screen max-w-[400px]">
                        <div className="flex flex-col items-center space-y-4 border rounded-lg p-2">
                            <label htmlFor="file-upload" className="cursor-pointer text-blue-500 hover:text-blue-700">
                                Choose a file
                            </label>
                            <input
                                onChange={handleChangeImage}
                                id="file-upload"
                                name="image"
                                type="file"
                                accept="image/*"
                                className="hidden"
                            />

                            <img
                                id="image-preview"
                                src={imageSrc || data.image}
                                alt="Image Preview"
                                className={` w-48 h-48 object-cover rounded-md ${imageSrc || data.image ? "" : "hidden"}`}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <form.Field
                                name="fullname"
                                children={(field) => {
                                    return (
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor={field.name}>Fullname</label>
                                            <input
                                                className="border-2 border-gray-300 p-2 rounded-lg"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                            <FieldInfo field={field} />
                                        </div>
                                    );
                                }}
                            />
                            <form.Field
                                name="username"
                                children={(field) => (
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor={field.name}>Username</label>
                                        <input
                                            className="border-2 border-gray-300 p-2 rounded-lg"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )}
                            />
                            <form.Field
                                name="description"
                                children={(field) => (
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor={field.name}>Description</label>
                                        <textarea
                                            className="border-2 border-gray-300 p-2 rounded-lg"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )}
                            />
                            <form.Subscribe
                                selector={(state) => [state.canSubmit, state.isSubmitting]}
                                children={([canSubmit]) => (
                                    <button
                                        type="submit"
                                        disabled={!canSubmit}
                                        className="w-full cursor-pointer px-3 py-2 border-2 rounded-lg bg-sky-600 text-white uppercase disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                                    >
                                        Submit
                                    </button>
                                )}
                            />
                        </div>
                    </div>
                </form>
            )}
        </>
    );
}