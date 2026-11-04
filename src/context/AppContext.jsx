import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [branch, setBranch] = useState("all");
  const [language, setLanguage] = useState("en");
  const [fiscalYear, setFiscalYear] = useState("2026");
  const [dateFrom, setDateFrom] = useState("2026-08-01");
  const [dateTo, setDateTo] = useState("2026-08-31");
  const value = useMemo(() => ({
    branch, setBranch, language,
    direction: language === "ar" ? "rtl" : "ltr",
    toggleLanguage: () => setLanguage((current) => current === "en" ? "ar" : "en"),
    fiscalYear, setFiscalYear, dateFrom, setDateFrom, dateTo, setDateTo,
  }), [branch, language, fiscalYear, dateFrom, dateTo]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
