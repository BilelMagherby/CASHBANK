import { CheckCircle2, Clock3, FileUp } from "lucide-react";
import { Card } from "../ui/Primitives";
import { useLanguage } from "../../hooks/useLanguage";

export default function BankImportStatus() {
  const { t } = useLanguage();
  return <Card className="p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="text-sm font-bold text-slate-800">{t("Bank import status", "حالة استيراد البنك")}</h3><p className="mt-1 text-xs text-slate-500">{t("Latest statement · ALINMA", "آخر كشف حساب · الإنماء")}</p></div><span className="rounded-lg bg-emerald-50 p-2 text-emerald-600"><FileUp size={18} /></span></div>
    <div className="mt-5 flex items-center gap-3 rounded-lg border border-emerald-100 bg-emerald-50/60 p-3"><CheckCircle2 size={19} className="shrink-0 text-emerald-600" /><div><p className="text-sm font-semibold text-emerald-800">{t("Import successful", "تم الاستيراد بنجاح")}</p><p className="mt-0.5 text-xs text-emerald-700">{t("Last synced today at 09:15 · 27 records", "آخر مزامنة اليوم 09:15 · 27 حركة")}</p></div></div>
    <div className="mt-4 flex items-center justify-between text-xs text-slate-500"><span className="flex items-center gap-1.5"><Clock3 size={14} />{t("Next scheduled sync", "المزامنة القادمة")}</span><span className="font-semibold text-slate-700">Today, 18:00</span></div>
  </Card>;
}
