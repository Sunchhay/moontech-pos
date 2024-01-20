import React from 'react'
import Modal from '../Modal';

interface DialogProps {
    children?: React.ReactNode;
    isOpen: boolean;
    handleClose: () => void;
    title: string;
    description: string;
    firstButton: string;
    secondButton: string;
    firstButtonClick: () => void;
    secondButtonClick: () => void;
}

const AlertDialog = ({
    children,
    isOpen,
    handleClose,
    title,
    description,
    firstButton,
    secondButton,
    firstButtonClick,
    secondButtonClick
}: DialogProps) => {
    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <div>{title}</div>
        </Modal>
    )
}

export default AlertDialog