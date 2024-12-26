import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { deleteContact } from "../service";

export function useDeleteContact(id: string) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationKey: ["delete contact"],
        mutationFn: () => deleteContact(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
            navigate({
                to: "/",
            });
        },
        onError: () => {
            navigate({ to: "/error" });
        },
    });
    return { mutate };
}
