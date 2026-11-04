import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { branches } from "../../data/branches";
import { useLanguage } from "../../hooks/useLanguage";
import { useApp } from "../../context/AppContext";
import { Card, SectionTitle } from "../ui/Primitives";

const values = [18, 14, 22, 12, 9, 7];
const colors = ["#2E86AB", "#1E3A5F", "#27AE60", "#F39C12", "#8B5CF6", "#94A3B8"];

export default function BranchBreakdown() {
  const { t, isArabic } = useLanguage();
  const { branch: selectedBranch } = useApp();
  const data = branches.slice(1).map((branch, index) => ({ id: branch.id, name: isArabic ? branch.nameAr : branch.name, value: values[index] })).filter((item) => selectedBranch === "all" || item.id === selectedBranch);
  return <Card className="p-5"><SectionTitle title={t("Branch breakdown", "توزيع الفروع")} subtitle={t("Active employees by branch", "الموظفون النشطون حسب الفرع")} />
    <div className="flex flex-col items-center gap-3 sm:flex-row"><div className="h-[175px] w-full max-w-[210px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data} dataKey="value" nameKey="name" innerRadius={48} outerRadius={72} paddingAngle={3} stroke="none">{data.map((item, index) => <Cell key={item.name} fill={colors[index]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div><div className="grid w-full grid-cols-2 gap-x-3 gap-y-2">{data.map((item, index) => <div key={item.name} className="flex items-center gap-2 text-[10px] text-slate-500"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: colors[index] }} /><span className="truncate">{item.name}</span><b className="ms-auto text-slate-700">{item.value}</b></div>)}</div></div>
  </Card>;
}
