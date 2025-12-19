import { noop } from "lodash";
import { createContext, ReactNode, useMemo, useState } from "react";

type DarkModeContextValue = {
  isDarkModeEnabled: boolean;
  toggleDarkMode: (enable?: boolean) => void;
};

export const DarkModeContext = createContext<DarkModeContextValue>({ isDarkModeEnabled: true, toggleDarkMode: noop });

export function DarkModeProvider({ children }: { children: ReactNode }) {
  /**
   * We make dark mode enabled by default.
   */
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return window.localStorage.getItem("darkMode") !== "false";
  });

  const toggleDarkMode = (enable?: boolean) => {
    const toggleTo = enable ?? !isDarkModeEnabled;

    window.localStorage.setItem("darkMode", toggleTo.toString());

    setIsDarkModeEnabled(toggleTo);
  };

  const value = useMemo(() => ({ isDarkModeEnabled, toggleDarkMode }), [isDarkModeEnabled, toggleDarkMode]);

  return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>;
}
