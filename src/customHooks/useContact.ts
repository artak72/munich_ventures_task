import { useQuery } from "@tanstack/react-query";
import { getContact } from "../service";

export function useContact(id: string) {
    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: ["contact", id],
        queryFn: () => getContact(id),
    });

    return { data, isLoading, isSuccess, isError };
}
