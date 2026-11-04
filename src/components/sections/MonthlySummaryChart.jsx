import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, SectionTitle } from "../ui/Primitives";
import { useLanguage } from "../../hooks/useLanguage";
import { useApp } from "../../context/AppContext";

const data = [
  { month: "Mar", cashIn: 32100, cashOut: 28700 }, { month: "Apr", cashIn: 35400, cashOut: 31500 },
  { month: "May", cashIn: 33700, cashOut: 32900 }, { month: "Jun", cashIn: 38200, cashOut: 34700 },
  { month: "Jul", cashIn: 36500, cashOut: 36200 }, { month: "Aug", cashIn: 38121, cashOut: 38086 },
];

export default function MonthlySummaryChart() {
  const { t } = useLanguage();
  const { branch } = useApp();
  const branchRatios = { danis: 0.22, deshin: 0.17, gcc: 0.27, hajiss: 0.15, natheel: 0.11, foundation: 0.08 };
  const chartData = branch === "all" ? data : data.map((item) => ({
    ...item,
    cashIn: Math.round(item.cashIn * branchRatios[branch]),
    cashOut: Math.round(item.cashOut * branchRatios[branch]),
  }));
  return <Card className="p-5"><SectionTitle title={t("Monthly cash summary", "ملخص النقد الشهري")} subtitle={t("Cash in vs. cash out · SAR", "النقد الوارد مقابل الصادر · ريال سعودي")} />
    <div className="h-[270px] w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData} margin={{ top: 8, right: 4, left: -18, bottom: 0 }} barGap={5}>
      <CartesianGrid stroke="#eef1f5" vertical={false} /><XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} /><YAxis tickLine={false} axisLine={false} tick={{ fill: "#9ca3af", fontSize: 11 }} tickFormatter={(value) => `${value / 1000}k`} /><Tooltip formatter={(value) => [`${Number(value).toLocaleString()} SAR`]} contentStyle={{ borderRadius: 10, border: "1px solid #e8edf2", fontSize: 12 }} /><Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 10 }} /><Bar dataKey="cashIn" name={t("Cash in", "النقد الوارد")} fill="#27AE60" radius={[4, 4, 0, 0]} /><Bar dataKey="cashOut" name={t("Cash out", "النقد الصادر")} fill="#2E86AB" radius={[4, 4, 0, 0]} />
    </BarChart></ResponsiveContainer></div>
  </Card>;
}
