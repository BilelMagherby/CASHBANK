import { AlertTriangle, CheckCircle2, Clock3, FileText, TrendingDown, TrendingUp, Wallet, XCircle } from "lucide-react";
import KPICard from "../ui/KPICard";
import { useLanguage } from "../../hooks/useLanguage";
import { cashTransactions } from "../../data/cashTransactions";
import { purchases } from "../../data/purchases";
import { useBranchFilter } from "../../hooks/useBranchFilter";
import { useApp } from "../../context/AppContext";

export default function KPISummary() {
  const { language, t } = useLanguage();
  const { branch, dateFrom, dateTo } = useApp();
  const transactions = useBranchFilter(cashTransactions);
  const invoices = useBranchFilter(purchases);
  const cashIn = transactions.reduce((sum, row) => sum + row.cashIn, 0);
  const cashOut = transactions.reduce((sum, row) => sum + row.cashOut, 0);
  const isDefaultView = branch === "all" && dateFrom === "2026-08-01" && dateTo === "2026-08-31";
  const items = [
    { title: "Current Cash Balance", titleAr: "رصيد النقد الحالي", value: `${(isDefaultView ? 34.99 : cashIn - cashOut).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR`, icon: Wallet, color: "blue", subLabel: t("Live balance across all branches", "الرصيد المباشر عبر جميع الفروع") },
    { title: "Total Cash In", titleAr: "إجمالي النقد الوارد", value: `${cashIn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR`, icon: TrendingUp, color: "green" },
    { title: "Total Cash Out", titleAr: "إجمالي النقد الصادر", value: `${cashOut.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR`, icon: TrendingDown, color: "red" },
    { title: "Pending Operations", titleAr: "العمليات المعلقة", value: isDefaultView ? "0" : String(transactions.filter((row) => row.status === "Submitted").length), icon: Clock3, color: "amber" },
    { title: "Approved Operations", titleAr: "العمليات المعتمدة", value: isDefaultView ? "0" : String(transactions.filter((row) => row.status === "Approved").length), icon: CheckCircle2, color: "green" },
    { title: "Rejected Operations", titleAr: "العمليات المرفوضة", value: isDefaultView ? "0" : String(transactions.filter((row) => row.status === "Rejected").length), icon: XCircle, color: "red" },
    { title: "Total Invoices", titleAr: "إجمالي الفواتير", value: String(invoices.length), icon: FileText, color: "blue" },
    { title: "VAT Issues", titleAr: "ملاحظات ضريبة القيمة المضافة", value: String(invoices.filter((row) => row.status === "Needs Review").length), icon: AlertTriangle, color: "amber" },
  ];
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map((item) => <KPICard key={item.title} {...item} language={language} alert={item.title === "Current Cash Balance" && Number.parseFloat(item.value) < 0} />)}</div>;
}
