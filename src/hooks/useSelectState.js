// Importing the useState hook from the "react" library
import { useState } from "react";

// Creating a custom hook named "useSelectState"
export const useSelectState = () => {
  // Declaring a state variable "isSelected" and a function "setIsSelected" to update its value
  const [isSelected, setIsSelected] = useState(false);

  // Defining a function component named "Select"
  const Select = () => {
    // Checking if "isSelected" is already true, if true, return
    if (isSelected) return;
    // Setting the value of "isSelected" to true
    setIsSelected(true);
  };

  // Defining a function component named "Unselect"
  const Unselect = () => {
    // Checking if "isSelected" is already false, if true, return
    if (!isSelected) return;
    // Setting the value of "isSelected" to false
    setIsSelected(false);
  };

  // Defining a function component named "Toggle"
  const Toggle = () => {
    // Toggling the value of "isSelected" (if it's true, set it to false; if it's false, set it to true)
    setIsSelected(!isSelected);
  };

  // Returning an object containing the current value of "isSelected", as well as the "Select", "Unselect", and "Toggle" functions
  return { isSelected, Select, Unselect, Toggle };
};