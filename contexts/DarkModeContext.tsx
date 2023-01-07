import { noop } from "lodash";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

type DarkModeContextValue = {
  isDarkModeEnabled: boolean;
  toggleDarkMode: (enable?: boolean) => void;
};

export const DarkModeContext = createContext<DarkModeContextValue>({ isDarkModeEnabled: true, toggleDarkMode: noop });

export function DarkModeProvider({ children }: { children: ReactNode }) {
  /**
   * We make dark mode enabled by default.
   */
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(true);

  /**
   * We check if the user has a preference for dark mode and we set it accordingly.
   */
  useEffect(() => setIsDarkModeEnabled(window.localStorage.getItem("darkMode") !== "false"), []);

  const toggleDarkMode = (enable?: boolean) => {
    const toggleTo = enable ?? !isDarkModeEnabled;

    window.localStorage.setItem("darkMode", toggleTo.toString());

    setIsDarkModeEnabled(toggleTo);
  };

  const value = useMemo(() => ({ isDarkModeEnabled, toggleDarkMode }), [isDarkModeEnabled, toggleDarkMode]);

  return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>;
}
