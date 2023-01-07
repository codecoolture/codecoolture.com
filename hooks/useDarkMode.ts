import { useContext } from "react";

import { DarkModeContext } from "@/contexts";

export function useDarkMode() {
  const { isDarkModeEnabled, toggleDarkMode } = useContext(DarkModeContext);

  return { isDarkModeEnabled, toggleDarkMode };
}
