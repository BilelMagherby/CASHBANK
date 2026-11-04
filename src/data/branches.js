export const branches = [
  { id: "all", name: "All Branches", nameAr: "كل الفروع" },
  { id: "danis", name: "Dani's", nameAr: "دانيز" },
  { id: "deshin", name: "Deshin", nameAr: "ديشين" },
  { id: "gcc", name: "GCC Vibe", nameAr: "جي سي سي فايب" },
  { id: "hajiss", name: "Hajiss-Cafe", nameAr: "مقهى هاجس" },
  { id: "natheel", name: "Natheel Office", nameAr: "مكتب نخيل" },
  { id: "foundation", name: "Natheel Trading Est.", nameAr: "مؤسسة إبراهيم عبدالكريم الربيعان التجارية" },
];

export const branchName = (id) => branches.find((branch) => branch.id === id)?.name ?? id;
