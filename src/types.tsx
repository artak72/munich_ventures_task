import { z } from "zod";
import { userSchema } from "./utils/schema";

export interface IContact {
    image: string;
    id: string;
    username: string;
    fullname: string;
    description: string
}

export interface IParams {
    contactid: string
}

export interface IArgs {
    id: string,
    contactItem:  Omit<IContact, "id">
}
export interface Params {
    contactid: string; 
}


export interface IDeleteModalArgs {
    id: string,
    setShowModal: (show: boolean) => void 
}

export type User = z.infer<typeof userSchema>;