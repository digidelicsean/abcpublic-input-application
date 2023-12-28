// Import the necessary hooks from the React library
import { useState, useEffect } from "react";

// Define a custom hook called useLocalStorage that takes in two parameters: key and initialValue
const useLocalStorage = (key, initialValue) => {
  // Use the useState hook to create a state variable called "value" and a function to update it called "setValue"
  const [value, setValue] = useState(() => {
    // Initialize the state variable "value" with the value retrieved from the localStorage using the provided key
    const storedValue = localStorage.getItem(key);
    // If there is a stored value, parse it from JSON format and use it as the initial value, otherwise use the provided initialValue
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  // Define a function called "updateValue" that takes in a new value and updates the localStorage and state variable "value"
  const updateValue = (newValue) => {
    // Store the new value in the localStorage using the provided key, after converting it to JSON format
    localStorage.setItem(key, JSON.stringify(value));
    // Update the state variable "value" with the new value
    setValue(newValue);
  };

  // Return an array containing the state variable "value" and the function "updateValue"
  return [value, updateValue];
};

// Export the useLocalStorage hook as the default export of the module
export default useLocalStorage;