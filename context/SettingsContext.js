"use client";

import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [primary, setPrimary] = useState("#3b82f6");
  const [fontSize, setFontSize] = useState("16px");

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", primary);
    document.documentElement.style.fontSize = fontSize;
  }, [primary, fontSize]);

  return (
    <SettingsContext.Provider
      value={{ primary, setPrimary, fontSize, setFontSize }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);