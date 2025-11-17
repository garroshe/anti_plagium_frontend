import {createContext, ReactNode, useContext, useState} from "react";
import {ModalUI} from "../components/Modal/Modal.tsx";

type ModalContextType = {
    openModal: ({modalName}: {modalName: string}) => void;
    closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
    openModal: () => {},
    closeModal: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalName, setModalName] = useState<string>("");

    const openModal = ({modalName}: {modalName: string}) => {
        setModalName(modalName);
        setIsOpen(true)
    };
    const closeModal = () => {
        setModalName("");
        setIsOpen(false)
    };

    return (
        <ModalContext.Provider value={{
            openModal, closeModal,
        }}>
            {children}
            <ModalUI isOpen={isOpen} modalName={modalName} closeModal={closeModal} />
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext);