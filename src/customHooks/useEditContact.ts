import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { IArgs } from "../types";
import { editContact } from "../service";

export function useEditContact() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationKey: ["edit contact"],
        mutationFn: (args: IArgs) => editContact(args.id, args.contactItem),
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
