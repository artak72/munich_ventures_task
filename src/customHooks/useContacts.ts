import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../service";

export function useContacts() {
    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: ["contacts"],
        queryFn: getContacts,
    });

    return { data, isLoading, isSuccess, isError };
}
