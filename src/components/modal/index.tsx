import { useDeleteContact } from "../../customHooks/useDeleteContact";
import { IDeleteModalArgs } from "../../types";

export function DeleteModal({ id, setShowModal }: IDeleteModalArgs) {

    const { mutate } = useDeleteContact(id);
    const handleDelete = async () => {
        mutate()
    }

    const onClose = () => {
        setShowModal(false);
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this contact?</h3>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
