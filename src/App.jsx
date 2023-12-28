/* eslint-disable no-unused-vars */ // Disable eslint warnings for unused variables

// Import the useState hook from the 'react' library
import { useState } from "react";

// Import the useRouter hook from the './hooks/useRoutes' file
import { useRouter } from "./hooks/useRoutes";

// Import the Table and ConfigProvider components from the 'antd' library
import { Table, ConfigProvider} from "antd";

// Import the 'App.css' file
import "./App.css";

// Define the App component
function App() {
  // Get the RoutesComponent from the useRouter hook
  const {RoutesComponent} = useRouter()

  // Render the RoutesComponent
  return (
      <RoutesComponent/>
  );
}

// Export the App component as the default export
export default App;