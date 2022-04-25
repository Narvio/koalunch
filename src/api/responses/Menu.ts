export enum MenuType {
  Standard,
  PDF
}

export interface RestaurantData {
  id: string;
  name: string;
  url: string;
}

export interface MealData {
  name: string;
  price: string;
}

export interface MenuData {
  name?: string;
  meals: MealData[];
}

export interface MenuPDFInfo {
  content: ArrayBuffer;
  url: string;
  pages: number[];
}

export interface MenuApiResponse {
  restaurant: RestaurantData;
  menus: MenuData[];
  type: MenuType;
  pdfInfo?: MenuPDFInfo;
}
