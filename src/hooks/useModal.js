// Import the useState hook from the 'react' library
import { useState } from "react";

// Export a custom hook named 'useModal' which takes two callback functions as arguments: onConfirm and onCancel
export const useModal = (onConfirm, onCancel) => {
  // Declare a state variable named 'isOpen' and initialize it to 'false'
  const [isOpen, setIsOpen] = useState(false);

  // Define a function named 'Toggle' which toggles the value of 'isOpen'
  const Toggle = () => {
    setIsOpen(!isOpen);
  };

  // Define a function named 'Open' which sets 'isOpen' to 'true'
  const Open = () => {
    setIsOpen(true);
  };

  // Define a function named 'Close' which sets 'isOpen' to 'false'
  const Close = () => {
    setIsOpen(false);
  };

  // Define a function named 'onModalConfirm' which performs the following actions:
  // - Close the modal by calling the 'Close' function
  // - If 'onConfirm' is defined, call the 'onConfirm' function
  const onModalConfirm = () => {
    Close();
    if (typeof onConfirm === "function") {
      onConfirm();
    }
  };

  // Define a function named 'onModalCancel' which performs the following actions:
  // - Close the modal by calling the 'Close' function
  // - If 'onCancel' is defined, call the 'onCancel' function
  const onModalCancel = () => {
    Close();
    if (typeof onCancel === "function") {
      onCancel();
    }
  };

  // Return an object with the following properties and their corresponding functions:
  // - isOpen: the current value of 'isOpen'
  // - Toggle: the 'Toggle' function
  // - Open: the 'Open' function
  // - Close: the 'Close' function
  // - onModalConfirm: the 'onModalConfirm' function
  // - onModalCancel: the 'onModalCancel' function
  return { isOpen, Toggle, Open, Close, onModalConfirm, onModalCancel };
};