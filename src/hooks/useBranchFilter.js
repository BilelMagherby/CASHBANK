import { useApp } from "../context/AppContext";

export function useBranchFilter(rows) {
  const { branch, dateFrom, dateTo } = useApp();
  return rows.filter((row) => {
    if (branch !== "all" && row.branch !== branch) return false;
    if (!row.date) return true;
    const date = String(row.date).slice(0, 10);
    return (!dateFrom || date >= dateFrom) && (!dateTo || date <= dateTo);
  });
}
