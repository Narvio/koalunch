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
  meals: MealData[];
}

export interface MenuApiResponse {
  restaurant: RestaurantData;
  menus: MenuData[];
}
