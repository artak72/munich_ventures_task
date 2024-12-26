import axios from "axios";
import { IContact } from "../types";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const getContacts = async () => {
    const { data } = await axios.get(`${VITE_BASE_URL}/users`);
    return data;
};

const getContact = async (id: string) => {
    const { data } = await axios.get(`${VITE_BASE_URL}/users/${id}`);
    return data;
};

const postContact = async (contactItem: Omit<IContact, "id">) => {
    const { data } = await axios.post(`${VITE_BASE_URL}/users`, contactItem);
    return data;
};

const deleteContact = async (id: string) => {
    const { data } = await axios.delete(`${VITE_BASE_URL}/users/${id}`);
    return data;
};

const editContact = async (id: string, contactItem: Omit<IContact, "id">) => {
    const { data } = await axios.put(`${VITE_BASE_URL}/users/${id}`, contactItem);
    return data;
};

export { getContacts, getContact, postContact, deleteContact, editContact };
