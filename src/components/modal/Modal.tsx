import { useEffect } from "react";
import ReactPortal from "./ReactPortal";

interface ModalProps {
    children?: React.ReactNode;
    isOpen: boolean;
    handleClose: () => void;
}

function Modal({ children, isOpen, handleClose }: ModalProps) {
    useEffect(() => {
        const closeOnEscapeKey = (e: any) => e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [handleClose]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return (): void => {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <ReactPortal wrapperId="react-portal-modal-container">
            <div className={'modal'}>
                {children}
            </div>
        </ReactPortal>
    );
};

export default Modal;