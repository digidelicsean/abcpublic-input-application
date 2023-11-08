import { useState } from "react";

export const useButtonState = () => {
  const [isSelected, setIsSelected] = useState(false);

  const Select = () => {
    if (isSelected) return;
    setIsSelected(true);
  };

  const Unselect = () => {
    if (!isSelected) return;
    setIsSelected(false);
  };

  const Toggle = () => {
    setIsSelected(!isSelected);
  };

  return {isSelected, Select, Unselect, Toggle}
};
