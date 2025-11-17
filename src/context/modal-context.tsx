import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import { ModalUI } from "../components/Modal/Modal.tsx";
import type { ModalNameType } from "../components/Modal/modalsView/type";

type ModalContextType = {
  openModal: ({ modalName }: { modalName: ModalNameType }) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalName, setModalName] = useState<ModalNameType | null>(null);

  const openModal = ({ modalName }: { modalName: ModalNameType }) => {
    setModalName(modalName);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalName(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalName && <ModalUI isOpen={isOpen} modalName={modalName} closeModal={closeModal} />}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
