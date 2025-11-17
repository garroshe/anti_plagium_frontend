import { Modal } from "antd";

import { modalMap } from "./constants.ts";

export type ModalName = keyof typeof modalMap;

type ModalUIPropsType = {
  modalName: ModalName;
  isOpen: boolean;
  closeModal: () => void;
};

export const ModalUI = ({ modalName, isOpen, closeModal }: ModalUIPropsType) => {
  const ModalType = modalMap[modalName];

  return (
    <Modal open={isOpen} onCancel={closeModal} footer={null}>
      {isOpen && <ModalType />}
    </Modal>
  );
};
