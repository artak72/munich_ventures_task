import { FieldApi } from "@tanstack/react-form";

export function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <small className="text-red-500">{field.state.meta.errors.join(",")}</small>
            ) : null}
        </>
    );
}

