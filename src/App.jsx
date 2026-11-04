import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import CashPage from "./pages/CashPage";
import BankPage from "./pages/BankPage";
import PurchasesPage from "./pages/PurchasesPage";
import AttendancePage from "./pages/AttendancePage";
import TasksPage from "./pages/TasksPage";
import VATPage from "./pages/VATPage";
import OdooPage from "./pages/OdooPage";
import SettingsPage from "./pages/SettingsPage";
import DocumentsPage from "./pages/DocumentsPage";
import TaxReturnReminderPage from "./pages/TaxReturnReminderPage";

export default function App() {
  return <Layout><Routes>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/cash" element={<CashPage />} />
    <Route path="/bank" element={<BankPage />} />
    <Route path="/purchases" element={<PurchasesPage />} />
    <Route path="/invoices" element={<DocumentsPage kind="invoice" />} />
    <Route path="/debit-notes" element={<DocumentsPage kind="debitNote" />} />
    <Route path="/credit-notes" element={<DocumentsPage kind="creditNote" />} />
    <Route path="/attendance" element={<AttendancePage />} />
    <Route path="/tasks" element={<TasksPage />} />
    <Route path="/vat" element={<VATPage />} />
    <Route path="/tax-reminder" element={<TaxReturnReminderPage />} />
    <Route path="/odoo" element={<OdooPage />} />
    <Route path="/settings" element={<SettingsPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></Layout>;
}
