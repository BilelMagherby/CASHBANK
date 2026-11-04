import { AlertTriangle, BadgeCheck, ReceiptText } from "lucide-react";
import { purchases } from "../../data/purchases";
import { useBranchFilter } from "../../hooks/useBranchFilter";
import { useLanguage } from "../../hooks/useLanguage";
import { Card, SectionTitle } from "../ui/Primitives";
import StatusBadge from "../ui/StatusBadge";

export default function VATControl() {
  const rows = useBranchFilter(purchases);
  const { t } = useLanguage();
  const vatTotal = rows.reduce((sum, row) => sum + row.vat, 0);
  const reviewed = rows.filter((row) => row.status === "Reviewed").length;
  return <div className="space-y-5">
    <div className="grid gap-4 sm:grid-cols-3">
      {[{ label: t("Invoices tracked", "الفواتير المتابعة"), value: rows.length, icon: ReceiptText, tone: "text-accent bg-sky-50" }, { label: t("Input VAT (15%)", "ضريبة المدخلات (١٥٪)"), value: `${vatTotal.toLocaleString()} SAR`, icon: BadgeCheck, tone: "text-emerald-600 bg-emerald-50" }, { label: t("Issues requiring action", "ملاحظات تتطلب إجراء"), value: rows.filter((row) => row.status === "Needs Review").length, icon: AlertTriangle, tone: "text-amber-600 bg-amber-50" }].map((item) => <Card key={item.label} className="p-4"><div className="flex items-center justify-between"><div><p className="text-xs text-slate-500">{item.label}</p><p className="mt-2 text-xl font-bold">{item.value}</p></div><span className={`rounded-xl p-2.5 ${item.tone}`}><item.icon size={20} /></span></div></Card>)}
    </div>
    <Card className="p-5"><SectionTitle title={t("VAT control", "التحكم بضريبة القيمة المضافة")} subtitle={t("Saudi VAT invoice readiness and input tax status", "جاهزية الفواتير الضريبية وحالة ضريبة المدخلات")} />
      <div className="mb-4 flex flex-wrap gap-3 rounded-lg bg-slate-50 p-4 text-sm"><span>{t("Reviewed", "تمت المراجعة")}: <b className="text-emerald-700">{reviewed}</b></span><span>{t("Pending / needs review", "معلق / يحتاج مراجعة")}: <b className="text-amber-700">{rows.length - reviewed}</b></span><span>{t("Rate", "النسبة")}: <b>15%</b></span></div>
      <div className="scrollbar-thin overflow-x-auto"><table className="w-full min-w-[700px] text-sm"><thead><tr className="border-y bg-slate-50 text-start text-xs text-slate-500"><th className="px-4 py-3">{t("Invoice", "الفاتورة")}</th><th className="px-4 py-3">{t("Supplier", "المورد")}</th><th className="px-4 py-3">{t("Net amount", "المبلغ قبل الضريبة")}</th><th className="px-4 py-3">{t("VAT amount", "مبلغ الضريبة")}</th><th className="px-4 py-3">{t("Compliance", "الامتثال")}</th></tr></thead><tbody>{rows.map((row) => <tr className="border-b border-slate-100" key={row.id}><td className="px-4 py-3 font-semibold">{row.id}</td><td className="px-4 py-3 text-slate-600">{row.supplier}</td><td className="px-4 py-3">{row.amount.toLocaleString()} SAR</td><td className="px-4 py-3">{row.vat.toLocaleString()} SAR</td><td className="px-4 py-3"><StatusBadge status={row.status} /></td></tr>)}</tbody></table></div>
    </Card>
  </div>;
}
