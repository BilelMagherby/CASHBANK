import { purchases } from "../../data/purchases";
import { useBranchFilter } from "../../hooks/useBranchFilter";
import { useLanguage } from "../../hooks/useLanguage";
import DataTable, { displayBranch } from "../ui/DataTable";
import { Card, SectionTitle } from "../ui/Primitives";

export default function PurchaseRegister({ compact = false }) {
  const rows = useBranchFilter(purchases);
  const { t, isArabic } = useLanguage();
  const columns = [
    { key: "id", label: t("Invoice", "الفاتورة"), emphasis: true }, { key: "date", label: t("Date", "التاريخ"), sortable: true },
    { key: "branch", label: t("Branch", "الفرع"), render: (row) => displayBranch(row.branch, isArabic) },
    { key: "supplier", label: t("Supplier", "المورد") }, { key: "description", label: t("Description", "الوصف"), render: (row) => isArabic ? row.descriptionAr : row.description },
    { key: "amount", label: t("Subtotal", "الإجمالي"), sortable: true, render: (row) => `${row.amount.toLocaleString()} SAR` },
    { key: "vat", label: t("VAT (15%)", "ضريبة القيمة المضافة (١٥٪)"), render: (row) => `${row.vat.toLocaleString()} SAR` }, { key: "status", label: t("Status", "الحالة"), status: true },
  ];
  return <Card className="p-5"><SectionTitle title={t("Purchase register", "سجل المشتريات")} subtitle={t("Invoice validation and VAT tracking", "التحقق من الفواتير ومتابعة ضريبة القيمة المضافة")} /><DataTable columns={columns} rows={compact ? rows.slice(0, 5) : rows} searchKeys={["id", "supplier", "description", "descriptionAr"]} filename="purchase-register.csv" /></Card>;
}
