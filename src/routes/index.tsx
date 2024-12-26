import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Main,
});

function Main() {
    return (
        <div className="flex items-center justify-center h-full ">
            <p className="text-gray-500 text-2xl">Choose a contact from left sidebar..</p>
        </div>
    );
}
