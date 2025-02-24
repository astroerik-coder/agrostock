// app/types/index.ts
export interface ProductItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  status: string;
  icon: string;
}

export interface CategoryData {
  [key: string]: ProductItem[];
}