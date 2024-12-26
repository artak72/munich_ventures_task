import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useContacts } from "../customHooks/useContacts";
import { useIsFetching } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { IContact, Params } from "../types";

export const Route = createRootRoute({
    component: Root,
});

function Root() {
    const navigate = useNavigate();
    const { data } = useContacts();
    const isFetching = useIsFetching();
    const [searchData, setSearchData] = useState("");
    const { contactid }: Params = Route.useParams();

    const handleGoToCreateContact = () => {
        navigate({
            to: "/create",
        });
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchData(event.target.value);
    };

    const handleContactView = (id: string) => {
        navigate({
            to: "/contacts/$contactid",
            params: { contactid: id },
        });
    };

    return (
        <>
            <div className="flex h-screen">
                <div className="flex-col border-r-2 bg-gray-100">
                    <div className="flex gap-4 py-[20px] px-[40px] border-b-2">
                        <div className="flex items-center border rounded-md overflow-hidden bg-white">
                            <span className="flex items-center justify-center px-2 text-gray-400">
                                <svg
                                    className="w-5 h-5 text-gray-500 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="100"
                                    height="100"
                                    viewBox="0 0 50 50"
                                >
                                    <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                                </svg>
                            </span>
                            <input
                                onChange={handleSearchChange}
                                placeholder="Search"
                                type="text"
                                className="flex-1 py-2"
                            />
                        </div>
                        <button onClick={handleGoToCreateContact} className="p-2 border-2 rounded-lg text-sky-600">
                            New
                        </button>
                    </div>
                    <div className="flex-col p-[40px]">
                        {data?.map((el: IContact) => {
                            return (
                                el.fullname.toUpperCase().includes(searchData.toUpperCase()) && (
                                    <p
                                        key={el.id}
                                        className={`${contactid === el.id ? "text-white bg-blue-600" : "text-black"} p-2 rounded-lg cursor-pointer`}
                                        onClick={() => handleContactView(el.id)}
                                    >
                                        {el.fullname}
                                    </p>
                                )
                            );
                        })}
                    </div>
                </div>
                <div className="px-[50px] py-[40px]">
                    <Outlet />
                </div>
            </div>
            {isFetching ? (
                <div className="absolute top-0 z-10 bg-gray-400 left-0 w-full h-full opacity-40 flex items-center justify-center">
                    <img src="/loader.gif" className="w-40 h-40" />
                </div>
            ) : null}
        </>
    );
}
