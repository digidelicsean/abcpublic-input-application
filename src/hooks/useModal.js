import { useState } from "react";

export const useModal = (onConfirm, onCancel) => {
  const [isOpen, setIsOpen] = useState(false);

  const Toggle = () => {
    setIsOpen(!isOpen);
  };

  const Open = () => {
    setIsOpen(true);
  };

  const Close = () => {
    setIsOpen(false);
  };

  const onModalConfirm = () => {
    Close();
    if (!onConfirm) return;
    onConfirm();
  };

  const onModalCancel = () => {
    Close();
    if (!onCancel) return;
    onCancel();
  };

  return { isOpen, Toggle, Open, Close, onModalConfirm, onModalCancel };
};
