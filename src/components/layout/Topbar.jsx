import { useLocation } from "react-router-dom";
import { Bell, Globe2, Menu, Search } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { Button } from "../ui/Primitives";

export default function Topbar({ onMenu }) {
  const { t, isArabic, toggleLanguage } = useLanguage();
  const { pathname } = useLocation();
  const pageTitle = pathname === "/bank-statement" ? t("Bank statement", "كشف الحساب البنكي") : t("Overview", "نظرة عامة");
  return <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-slate-100 bg-white px-4 shadow-sm md:px-8">
    <div className="flex items-center gap-3"><Button variant="ghost" className="px-2 lg:hidden" aria-label={t("Open menu", "فتح القائمة")} onClick={onMenu}><Menu size={20} /></Button>
      <div className="hidden items-center gap-2 text-sm text-slate-400 md:flex"><Search size={15} /><span>{t("Finance workspace", "مساحة العمل المالية")}</span><span className="text-slate-300">/</span><span className="font-semibold text-slate-700">{pageTitle}</span></div>
      <div className="md:hidden text-sm font-bold text-navy">NATHEEL</div>
    </div>
    <div className="flex items-center gap-2">
      <Button variant="ghost" className="relative px-2.5" aria-label={t("Notifications", "الإشعارات")}><Bell size={18} /><span className="absolute end-1 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" /></Button>
      <Button variant="outline" className="h-9 px-3" onClick={toggleLanguage}><Globe2 size={15} /><span>{isArabic ? "English" : "العربية"}</span></Button>
      <div className="ms-1 flex items-center gap-2 border-s border-slate-200 ps-3"><div className="grid h-8 w-8 place-items-center rounded-full bg-[#e6f0f5] text-xs font-bold text-navy">{isArabic ? "سإ" : "SI"}</div><div className="hidden sm:block"><p className="text-xs font-semibold text-slate-700">{isArabic ? "سالم إبراهيم" : "Salem Ibrahim"}</p><p className="text-[10px] text-slate-400">{t("Finance Admin", "مسؤول مالي")}</p></div></div>
    </div>
  </header>;
}
