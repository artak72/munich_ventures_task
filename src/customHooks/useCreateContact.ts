import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { IContact } from "../types";
import { postContact } from "../service";

export function useCreateContact() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationKey: ["add contact"],
        mutationFn: (contactItem: Omit<IContact, "id">) => postContact(contactItem),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
            navigate({
                to: "/contacts/$contactid",
                params: { contactid: data.id },
            });
        },
        onError: () => {
            navigate({ to: "/error" });
        },
    });
    return { mutate };
}
