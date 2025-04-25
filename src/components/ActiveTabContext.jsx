import React, { createContext, useContext, useState } from "react";

// Create the context object
const ActiveTabContext = createContext();

// This component will provide the global state to the whole app
export function ActiveTabProvider({ children }) {
  // This is the shared state, with "Home" as default value
  const [isActive, setIsActive] = useState("Home");

  return (
    // Make isActive and setIsActive available to all children components
    <ActiveTabContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </ActiveTabContext.Provider>
  );
}

// Custom hook to easily use the context in any component
export function useActiveTab() {
  return useContext(ActiveTabContext);
}
