import { noop } from "lodash";
import { createContext, ReactNode, useCallback, useMemo, useState } from "react";

type DarkModeContextValue = {
  isDarkModeEnabled: boolean;
  toggleDarkMode: (enable: boolean) => void;
};

export const DarkModeContext = createContext<DarkModeContextValue>({ isDarkModeEnabled: true, toggleDarkMode: noop });

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(true);

  const toggleDarkMode = useCallback(() => (enable: boolean) => setIsDarkModeEnabled(enable), []);
  const value = useMemo(() => ({ isDarkModeEnabled, toggleDarkMode }), [isDarkModeEnabled, toggleDarkMode]);

  return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>;
}
