import { ActiveTabProvider } from "./ActiveTabContext";
import { SelectedItemProvider } from "./SelectedItemProvider";

function GlobalContextProvider({ children }) {
  return (
    <ActiveTabProvider>
      <SelectedItemProvider>{children}</SelectedItemProvider>
    </ActiveTabProvider>
  );
}

export default GlobalContextProvider;
