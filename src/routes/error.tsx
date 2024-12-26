import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/error")({
    component: ErrorPage,
});

function ErrorPage() {
    return (
        <div className="flex items-center justify-center h-full ">
            <p className="text-red-500 text-2xl">Something went wrong</p>
        </div>
    );
}
