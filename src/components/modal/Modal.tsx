import { useEffect, useState } from "react";
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
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} className={`fixed inset-0 flex flex-col items-center justify-center p-5 overflow-hidden z-[999]`}>
                {children}
            </div>
        </ReactPortal >
    );
};

export default Modal;