import { IoIosWarning, IoIosCheckmarkCircle } from "react-icons/io";
import { toast } from "sonner"

export function ErrorToast(title: string, description?: string) {
    return toast(title, {
        description: description,
        icon: <IoIosWarning size={24} color='red' />,
        style: { gap: 12 }
    });
}

export function SuccessToast(title: string, description?: string) {
    return toast(title, {
        description: description,
        icon: <IoIosCheckmarkCircle size={24} color='green' />,
        style: { gap: 12 }
    });
}