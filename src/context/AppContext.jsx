import { createContext, useContext, useMemo, useState } from "react";
import { initialDocuments } from "../data/documents";
import { DEFAULT_TAX_RETURN_SUBMITTED_DATE, isValidDateOnly } from "../utils/taxReturnSchedule";

const AppContext = createContext(null);
const TAX_RETURN_STORAGE_KEY = "natheel-tax-return-last-submitted";

export function AppProvider({ children }) {
  const [branch, setBranch] = useState("all");
  const [language, setLanguage] = useState("en");
  const [fiscalYear, setFiscalYear] = useState("2026");
  const [dateFrom, setDateFrom] = useState("2026-08-01");
  const [dateTo, setDateTo] = useState("2026-08-31");
  const [documents, setDocuments] = useState(initialDocuments);
  const [taxReturnSchedule, setTaxReturnSchedule] = useState(() => {
    try {
      const savedDate = window.localStorage.getItem(TAX_RETURN_STORAGE_KEY);
      if (!savedDate) return { lastSubmittedDate: DEFAULT_TAX_RETURN_SUBMITTED_DATE, storageError: "" };
      if (isValidDateOnly(savedDate)) return { lastSubmittedDate: savedDate, storageError: "" };
      return {
        lastSubmittedDate: DEFAULT_TAX_RETURN_SUBMITTED_DATE,
        storageError: "The saved tax return date is invalid. Save a valid date to replace it.",
      };
    } catch (error) {
      return {
        lastSubmittedDate: DEFAULT_TAX_RETURN_SUBMITTED_DATE,
        storageError: `Tax return reminder could not read browser storage: ${error.message}`,
      };
    }
  });
  const setTaxReturnLastSubmittedDate = (date) => {
    if (!isValidDateOnly(date)) throw new Error("A valid submission date is required.");
    setTaxReturnSchedule({ lastSubmittedDate: date, storageError: "" });
    try {
      window.localStorage.setItem(TAX_RETURN_STORAGE_KEY, date);
    } catch (error) {
      setTaxReturnSchedule({
        lastSubmittedDate: date,
        storageError: `The reminder date was updated for this session, but could not be saved in this browser: ${error.message}`,
      });
    }
  };
  const addDocuments = (type, newDocuments) => {
    setDocuments((current) => [
      ...current,
      ...newDocuments.map((document) => ({ ...document, id: `DOC-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, type })),
    ]);
  };
  const value = useMemo(() => ({
    branch, setBranch, language,
    direction: language === "ar" ? "rtl" : "ltr",
    toggleLanguage: () => setLanguage((current) => current === "en" ? "ar" : "en"),
    fiscalYear, setFiscalYear, dateFrom, setDateFrom, dateTo, setDateTo,
    documents, addDocuments,
    taxReturnLastSubmittedDate: taxReturnSchedule.lastSubmittedDate,
    taxReturnStorageError: taxReturnSchedule.storageError,
    setTaxReturnLastSubmittedDate,
  }), [branch, language, fiscalYear, dateFrom, dateTo, documents, taxReturnSchedule]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
